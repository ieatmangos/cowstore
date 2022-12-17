import swell from "../swell";

const createCardToken = async (cardDetails) => {
  // const res1 = await swell.card.validateNumber(cardDetails.number);
  // const res2 = await swell.card.validateExpiry(
  //   `${cardDetails.exp_month}/${cardDetails.exp_year}`
  // );
  // const res3 = await swell.card.validateCVC(cardDetails.cvc);
  // console.log(
  //   `${cardDetails.exp_month}/${cardDetails.exp_year}`,
  //   res1,
  //   res2,
  //   res3
  // );
  return await swell.card.createToken(cardDetails);
};
export default createCardToken;
