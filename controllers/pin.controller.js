import Pin from "../models/pin.model.js"

export const getPins = async (req, res) => {
  // implementing infinite page scroll logic
  const pageNumber = Number(req.query.cursor) || 0;
  const search = req.query.search;
  const LIMIT = 21;

  const pins = await Pin.find(
    search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { tags: { $in: [search] } },
          ],
        }
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