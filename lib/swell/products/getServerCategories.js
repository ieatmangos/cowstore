import swell from "swell-node";

export default async function getServerCategories() {
  swell.init(process.env.SWELL_STORE_ID, process.env.SWELL_SECRET_KEY);

  let result = "default";
  let error = false;
  try {
    const data = await swell.get("/categories", {
      where: {
        active: true,
      },
      limit: 25,
      page: 1,
    });

    // const test = await fetch("http://localhost:3001/getProducts").then((res) =>
    //   res.json()
    // );
    if (data) {
      result = data.results;
    }
  } catch (error) {
    console.log("error", error);
    result = null;
    error = true;
  }
  return [result, error];
}
