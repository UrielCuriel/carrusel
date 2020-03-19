/**
 * carrusel dinamico que se mueve con el scroll del mouse
 * @param {Object} config objeto de configuración del carrusel
 * @param {HTLMElement} config.element Elemento contenedor del carrusel
 * @param {Number} config.time Tiempo para el intervalo de auto play en milisegundos
 * @param {Number} config.imageCount Numero de imagenes que se van a mostrar
 * @param {{id: Number, url: string,large_url: string, source_id:Number?}[]} config.images imagenes que se mostraran en el carrusel
 */
function Carrusel(config) {
  /**
   * Elemento contenedor del carrusel
   * @name Carrusel#contenedor
   * @type HTMLElement
   */
  this.contenedor = config.element;
  /**
   * Intervalo de tiempo del carrusel con autoplay
   * @name Carrusel#time
   * @type Number
   */
  this.time = config.time;
  /**
   * Imagenes del carrusel
   * @name Carrusel#images
   * @type [{id: Number, url: string,large_url: string, source_id:Number?}]
   */
  this.images = config.images;
  /**
   * Array del las posisiones de las imagenes en pantalla
   * @name Carrusel#currentImages
   * @type [Number]
   */
  this.currentImages = Array.from(Array(config.imageCount).keys());

  if (this.images.length > 0) {
    this._loadCarrusel();
    setInterval(() => {
      if (!this.lock) this.nextImage();
    }, this.time);
  }
}
/**
 * Función para cargar las imagenes que se van a mostrar en pantalla
 */
Carrusel.prototype._loadCarrusel = function() {
  this.imgElements = this.currentImages.forEach(index => {
    this._loadImage(index);
  });
};
/**
 * Función para crear los elementos <img>
 */
Carrusel.prototype._loadImage = function(index, prepend) {
  const image = this.images[index];
  //crea el elemento de cada imagen
  const imgEl = document.createElement("img");
  imgEl.classList.add("w-1/3", "h-full", "object-cover");
  imgEl.src = image.url;
  //agrega la imagen al contenedor
  imgEl;
  if (prepend) {
    this.contenedor.prepend(imgEl);
  } else {
    this.contenedor.appendChild(imgEl);
  }
};
/**
 * Funcion para Eliminar la imagen de la pantalla
 */
Carrusel.prototype._removeImage = function(img) {
  this.contenedor.removeChild(img);
};
/**
 * Funcion para Cargar la siguiente imagen y eliminar la primer imagen
 */
Carrusel.prototype.nextImage = function() {
  this.lock = true;
  //obtinene el ultimo elemento que se muestra
  const last = this.currentImages.slice(-1).pop();
  //calcula la siguiente imagen como la ultima +1
  let next = last + 1;
  //si la siguiente imagen es mayor al array de imagenes vuelve a empezar
  if (next >= this.images.length) {
    next = 0;
  }
  this.currentImages.shift();
  this.currentImages.push(next);
  this._loadImage(next);

  this.contenedor.style.marginLeft = "-33.3%";
  this.contenedor.style.marginRight = "33.3%";
  this.contenedor.classList.add(
    "transition-all",
    "ease-in-out",
    "duration-700"
  );
  setTimeout(() => {
    this.contenedor.classList.remove(
      "transition-all",
      "ease-in-out",
      "duration-700"
    );
    this.contenedor.style.marginLeft = "0";
    this.contenedor.style.marginRight = "0";
    const firstImg = this.contenedor.firstChild;
    this._removeImage(firstImg);
    this.lock = false;
  }, 700);
};
/**
 * Funcion para Cargar la imagen anterior y eliminar la ultima imagen
 */
Carrusel.prototype.prevImage = function() {
  this.lock = true;
  //obtinene el primer elemento que se muestra
  const first = this.currentImages.slice(0).shift();
  //calcula la siguiente imagen como la ultima +1
  let prev = first - 1;
  //si la siguiente imagen es mayor al array de imagenes vuelve a empezar
  if (prev < 0) {
    prev = this.images.length - 1;
  }
  this.contenedor.style.marginLeft = "-33.3%";
  this.contenedor.style.marginRight = "33.3%";
  this.currentImages.pop();
  this.currentImages.unshift(prev);
  this._loadImage(prev, true);
  
  // logica de animacion
  this.contenedor.classList.add(
    "transition-all",
    "ease-in-out",
    "duration-700"
  );
  
  setTimeout(() => {
    // this.contenedor.style.marginLeft = "33.3%";
    // this.contenedor.style.marginRight = "-33.3%";
    this.contenedor.classList.remove(
      "transition-all",
      "ease-in-out",
      "duration-700"
    );
    // this.contenedor.style.marginLeft = "0";
    // this.contenedor.style.marginRight = "0";
    const lastImg = this.contenedor.lastChild;
    this._removeImage(lastImg);
    this.lock = false;
  }, 700);
};

export default Carrusel;
