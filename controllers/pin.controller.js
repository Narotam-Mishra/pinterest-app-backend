import Pin from "../models/pin.model.js"
import User from '../models/user.model.js';
import sharp from 'sharp';
import Imagekit from 'imagekit';

export const getPins = async (req, res) => {
  // implementing infinite page scroll logic
  const pageNumber = Number(req.query.cursor) || 0;
  const search = req.query.search;
  const userId = req.query.userId;
  const boardId = req.query.boardId;
  const LIMIT = 21;

  const pins = await Pin.find(
    search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { tags: { $in: [search] } },
          ],
        }
      : userId
      ? { user: userId }
      : boardId ? {board:boardId} 
      : {}
  )
    .limit(LIMIT)
    .skip(pageNumber * LIMIT);

  const hasNextPage = pins.length === LIMIT;

  // add delay to load page
  // await new Promise((resolve) => setTimeout(resolve, 500));
  res
    .status(200)
    .json({ pins, nextCursor: hasNextPage ? pageNumber + 1 : null });
};

// get single post by id
export const getPin = async (req, res) => {
  const { id } = req.params;

  const singlePin = await Pin.findById(id).populate("user", "username img, displayName");
  res.status(200).json(singlePin);
}

export const createPin = async (req, res) => {
  const { title, description, link, board, tags, textOptions, canvasOptions } =
    req.body;

  const media = req.files.media;

  if(!title || !description || !media){
    return res.status(400).json({ message: "All fields are required!" });
  }

  const parsedTextOptions = JSON.parse(textOptions || "{}")
  const parsedCanvasOptions = JSON.parse(canvasOptions || "{}")

  // console.log("create pin details:", title, description, link, board, tags);
  // console.dir(media);
  // console.dir(parsedTextOptions);
  // console.dir(parsedCanvasOptions);

  const metaData = await sharp(media.data).metadata();

  const originalOrientation = metaData.width < metaData.height ? "portrait" : "landscape";
  const originalAspectRatio = metaData.width / metaData.height;

  let clientAspectRatio;
  let width;
  let height;

  if (parsedCanvasOptions.size !== "original") {
    const [ratioWidth, ratioHeight] = parsedCanvasOptions.size.split(":").map(Number);
    clientAspectRatio = ratioWidth / ratioHeight;
  } else {
    clientAspectRatio = originalAspectRatio;
  }

  // calculate width and height based on the aspect ratio
  if (parsedCanvasOptions.orientation === "portrait") {
    height = Math.min(metaData.height, 2000); // Limit maximum height
    width = height * clientAspectRatio;
  } else {
    width = Math.min(metaData.width, 2000); // Limit maximum width
    height = width / clientAspectRatio;
  }

  // ensure width and height are integers
  width = Math.round(width);
  height = Math.round(height);

  const imagekit = new Imagekit({
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY,
    urlEndpoint: process.env.IK_URL_ENDPOINT,
  });

  // default canvas height if not provided
  const canvasHeight = parsedCanvasOptions.height || height;
  
  // calculate text positions with fallback values
  const textLeftPosition = Math.round((parsedTextOptions.left || 0) * width / 375);
  const textTopPosition = Math.round((parsedTextOptions.top || 0) * height / canvasHeight);

  const transformationString = `w-${width},h-${height}${
    originalAspectRatio > clientAspectRatio ? ",cm-pad_resize" : ""
  },bg-${(parsedCanvasOptions.backgroundColor || '#ffffff').substring(1)}${
    parsedTextOptions.text
      ? `,l-text,i-${parsedTextOptions.text},fs-${
          (parsedTextOptions.fontSize || 20) * 2.1
        },lx-${textLeftPosition},ly-${textTopPosition},co-${
          (parsedTextOptions.color || '#000000').substring(1)
        },l-end`
      : ""
  }`;

  imagekit
    .upload({
      file: media.data,
      fileName: media.name,
      folder: "test",
      transformation: {
        pre: transformationString,
      },
    })
    .then(async (response) => {
      // console.dir(response);

      // save pin to DB
      const newPin = await Pin.create({
        user: req.userId,
        title,
        description,
        link: link || null,
        board: board || null,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        media: response.filePath,
        width: response.width,
        height: response.height,
      })
      // console.log("New Pin:", newPin);
      return res.status(201).json(newPin);
    })
    .catch((err) => {
      console.log("Error:", err);
      return res.status(500).json(err);
    });
}