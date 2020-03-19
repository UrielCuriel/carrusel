import Carrusel from "./carrusel";
const container = document.getElementById("carrusel");

async function main() {
  const images = await fetch("http://www.splashbase.co/api/v1/images/search?query=green")
    //convierte la respuesta de la api en json
    .then(response => {
      return response.json();
    })
    //obtiene el array de imagenes de la respuesta de la api
    .then(res => {
      return res.images;
    });
  const carrusel = new Carrusel({
    element: container,
    time: 5000,
    images,
    imageCount: 3
  });
  window.addEventListener("wheel", event => {
    const wheelSpin = event.deltaY;
    const action = wheelSpin > 0 ? "next" : "prev";
    console.info(action);
    console.info(carrusel.currentImages);

    switch (action) {
      case "next":
        carrusel.nextImage();
        break;
      case "prev":
        carrusel.prevImage();
        break;

      default:
        break;
    }
  });
}
main();
