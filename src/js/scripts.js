import { request } from "./request";
import { searchToJson } from "./utils";
import { showAdvice, showLoader, showErrorScreen } from "./screen-utils";
import { initGiftcard } from "./giftcard";
import { initMovies } from "./movies";

// Get search params of URL and convert to JSON.
const { id } = searchToJson();

showLoader(true);
request.operationById(id, (data) => {
  const { resultado: { idFlujo } } = data;

  if (idFlujo === 'COMPRA_GIFTCARD') {
    initGiftcard(data);
  } else {
    initMovies(data);
  }

  showLoader(false);
}, showErrorScreen);

// Initialize advices.
$(".advice.fixed").each(function () {
  const $advice = $(this);
  const $closeBtn = $advice.find(".close-btn");
  
  $closeBtn.on("click", function () {
    showAdvice($advice, false);
  });
});

// Initialize share button.
$(".share-btn").on("click", function () {
  console.log("scripts.js: Share");
});
