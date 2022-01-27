var Particle = /** @class */ (function() {
    function Particle(width, height, screenCanvas, mapImg) {
        this.width = width;
        this.height = height;
        this.ctx = screenCanvas;
        this.x = Math.random() * width;
        this.y = 0;
        this.speed = 0;
        this.velocity = Math.random() * 2.5;
        this.size = Math.random() * 1.5 + 1;
        this._2PI = Math.PI * 2;
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        this.mappedImage = mapImg;
    }
    Particle.prototype.update = function() {
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        var movement = 0;
        if (this.y < this.height) {
            this.speed = this.mappedImage[0][this.position1][this.position2];
            movement = (2.5 - this.speed) + this.velocity;
        }
        this.y += movement;
        if (this.y >= this.height) {
            this.y = 0;
            this.x = Math.random() * this.width;
        }
    };
    Particle.prototype.draw = function() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.mappedImage[1][this.position1][this.position2];
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.fill();
    };
    Particle.prototype.getSpeed = function() {
        return this.speed;
    };
    return Particle;
}());
export { Particle };
var ParticleText = /** @class */ (function() {
    function ParticleText(x, y, screenCanvas, mapImg) {
        this.ctx = screenCanvas;
        this.x = x; // + 200;
        this.y = y; // - 100,
        this.size = 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = ((Math.random() * 10) + 0.5); //CONTROLA LA VELOCIDAD DE DESPLAZAMIENTO DE LA SPARTICULAS
        this._2PI = Math.PI * 2;
        this.mappedImage = mapImg;
        this.distance;
    }
    ParticleText.prototype.update = function(mouse) {
        var dx = mouse.x - this.x;
        var dy = mouse.y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        this.distance = distance; //le agregue
        var forceDirectionX = dx / distance;
        var forceDirectionY = dy / distance;
        var maxDistance = mouse.radius;
        var force = (maxDistance - distance) / maxDistance;
        var directionX = (forceDirectionX * force * this.density);
        var directionY = (forceDirectionY * force * this.density);
        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                var dx_1 = this.x - this.baseX;
                this.x -= dx_1 / 10;
            }
            if (this.y !== this.baseY) {
                var dy_1 = this.y - this.baseY;
                this.y -= dy_1 / 10;
            }
        }
    };
    ParticleText.prototype.draw = function(mouse) { //agrgue parametro mouse
        // this.ctx.strokeStyle = 'green';
        this.ctx.fillStyle = 'rgba(255,255,255,0.8)'; //aqui le cambie
        this.ctx.strokeStyle = 'rgba(34,147,214,1)';
        this.ctx.beginPath();

        if (this.distance < mouse.radius - 5) { //le agrege
            this.size = 13; //agregado
            this.ctx.arc(this.x, this.y, this.size, 0, this._2PI); //movi esto 
            this.ctx.stroke(); // dibuja la silueta de las particulas
            this.ctx.closePath(); //cierra el camino del dibujo 
            this.ctx.beginPath();
            this.ctx.arc(this.x - 3, this.y - 3, this.size / 2, 0, this._2PI); //movi esto
            this.ctx.arc(this.x + 1, this.y + 1, this.size / 3, 0, this._2PI); //movi esto
        } //agregado
        else if (this.distance <= mouse.radius) { //le agregue
            this.size = 10; //agregado
            this.ctx.arc(this.x, this.y, this.size, 0, this._2PI); //movi esto 
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.beginPath();
            this.ctx.arc(this.x - 2, this.y - 2, this.size / 3, 0, this._2PI); //m
            //this.ctx.arc(this.x, this.y, this.size, 0, this._2PI); //m

        } else { //agregado
            this.size = 8;
            this.ctx.arc(this.x, this.y, this.size, 0, this._2PI); //movi esto 
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.beginPath();
            this.ctx.arc(this.x - 1, this.y - 1, this.size / 3, 0, this._2PI); //m

        } //agregado

        this.ctx.closePath();
        this.ctx.fill();
    };
    return ParticleText;
}());
export { ParticleText };