const swell = require("swell-node");
const crypto = require("crypto");

const SWELL_STORE_ID = process.env.SWELL_STORE_ID;
const SWELL_SECRET_KEY = process.env.SWELL_SECRET_KEY;

function hashMessage(message) {
  return crypto.randomBytes(12).toString("hex");
}

export default async function handler(req, res) {
  const store = swell.init(SWELL_STORE_ID, SWELL_SECRET_KEY, {
    cache: false,
  });
  let result = null;

  // const body = {
  //   parent_id: "637549de6066500013fcec0b",
  //   title: "Review Title",
  //   rating: 5,
  //   comments: "Really awesome stuff",
  // };
  const body = req.body;

  try {
    const _result = await store.delete(`/products:reviews/${body.id}`);
    result = _result;
  } catch (er) {
    result = "error";
    // console.log("error", er);
  }
  return res.status(200).json(result);
}
