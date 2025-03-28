import Pin from "../models/pin.model.js"

export const getPins = async (req, res) => {
  // implementing infinite page scroll logic  
  const pageNumber = Number(req.query.cursor) || 0;
  const LIMIT = 21;
  const pins = await Pin.find()
    .limit(LIMIT)
    .skip(pageNumber * LIMIT);

  const hasNextPage = pins.length === LIMIT;

  // add delay to load page
  
  res.status(200).json({pins, nextCursor: hasNextPage ? pageNumber+1 : null });
};