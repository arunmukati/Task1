<template>
  <div id="homePage">
    <div id="topToolbar">
      <button class="btn" v-on:click="downloadCanvasImage">Download as image</button>
    </div>
    <div class="main-wrapper">
      <div id="sideToolbar">
        <div class="icon" v-for="ele in toolbarEle" :key="ele.name">
          <img
            :src="ele.imgSrc"
            alt=""
            srcset=""
            v-bind:id="ele.eleId"
            v-bind:ele-type="ele.name"
            @dragstart="dragStart(ele)"
          />
          <h1>{{ ele.name }}</h1>
        </div>
      </div>
      <div
        ref="canvas"
        class="canvas-wrapper"
        id="container"
        @dragover.prevent="dragOver"
        @drop.prevent="dropOver"
      ></div>
    </div>
  </div>
</template>

<script>
import Konva from "konva";
export default {
  name: "HomePage",
  data() {
    return {
      stage: null,
      layer: null,
      transformer: null,
      eleSelected: null,
      eleInjected: false,
      previousPosOfShape: null,
      shape: null,
      toolbarEle: [
        { eleId: 1, name: "floor", imgSrc: require("../assets/floor.png") },
        { eleId: 2, name: "cabin", imgSrc: require("../assets/cabin.png") },
        { eleId: 3, name: "seat", imgSrc: require("../assets/seat.png") },
      ],
    };
  },
  created() {
    let vm = this;
    this.$nextTick(() => {
      if (vm.$refs["canvas"]) {
        let height = window.innerHeight * 0.9;
        let width = window.innerWidth - 50;

        this.stage = new Konva.Stage({
          container: "container",
          width: width,
          height: height,
        });
        this.layer = new Konva.Layer();
        this.transformer = new Konva.Transformer();
        this.layer.add(this.transformer);
        this.stage.on("click", (ev) => {
          let isStage = ev.target.getAttr("container");
          if (!isStage) {
            this.shape = ev.target;
            this.eleSelected = parseInt(ev.target.getAttr("id").slice(-1));
            this.transformer.nodes([ev.target]);
          } else {
            this.transformer.detach();
          }
          this.updateStage();
        });
        document.addEventListener("click", () => {
          if (this.transformer) {
            this.transformer.detach();
            this.updateStage();
          }
        });
        document.addEventListener("keydown", (evt) => {
          if (vm.transformer && evt.key == "Delete" && this.shape) {
            vm.eliminateCurrentEle();
          }
        });
      }
    });
  },
  mounted() {},
  methods: {
    dragOver(event) {
      if (!this.eleInjected) {
        this.injectEleToCanvas();
      } else {
        this.moveInjecteEle(event);
      }
    },
    dragStart(ele) {
      this.eleSelected = ele.eleId;
      this.eleInjected = false;
    },
    dropOver() {
      this.checkElementConstraints();
    },
    injectEleToCanvas() {
      this.eleInjected = true;
      let box = this.getKonvaEle();
      if (box) {
        let vm = this;
        box.on("dragstart", function (ev) {
          vm.shape = ev.target;
          if (vm.shape) {
            vm.transformer.nodes([ev.target]);
            vm.updateStage();
          }
          vm.eleSelected = parseInt(vm.shape.getAttr("id").slice(-1));
          vm.previousPosOfShape = vm.shape.getClientRect();
        });
        box.on("dragend", () => {
          vm.checkElementConstraints();
        });

        box.on("dragmove", function () {
          document.body.style.cursor = "pointer";
          vm.eleSelected = parseInt(vm.shape.getAttr("id").slice(-1));
        });

        box.on("mouseover", function () {
          document.body.style.cursor = "pointer";
        });
        box.on("mouseout", function () {
          document.body.style.cursor = "default";
        });
        box.zIndex(this.eleSelected);
        let layer = new Konva.Layer();
        layer.add(box);
        this.stage.add(layer);
        this.transformer.nodes([box]);
        layer.add(this.transformer);
        this.stage.add(layer);
        this.shape = box;
      }
    },
    getKonvaEle() {
      if (this.eleSelected) {
        switch (this.eleSelected) {
          case 1:
            return new Konva.Rect({
              x: 35,
              y: 35,
              fill: "grey",
              stroke: "black",
              strokeWidth: 2,
              strokeScaleEnabled: false,
              draggable: true,
              width: 50,
              height: 50,
              id: "myEle1",
            });
          case 2:
            return new Konva.Rect({
              x: 35,
              y: 35,
              fill: "#fafafa",
              stroke: "black",
              strokeWidth: 2,
              strokeScaleEnabled: false,
              draggable: true,
              width: 25,
              height: 25,
              id: "myEle2",
            });
          case 3:
            var imageObj = new Image();
            imageObj.src = require("../assets/seat.png");
            return new Konva.Image({
              x: 50,
              y: 50,
              image: imageObj,
              width: 20,
              height: 20,
              draggable: true,
              id: "myEle3",
            });
        }
      }
    },
    moveInjecteEle(event) {
      if (this.shape) {
        let shape = this.shape;
        shape.setAttrs({
          x: event.offsetX - shape.getAttrs().width / 2,
          y: event.offsetY - shape.getAttrs().height / 2,
        });
      }
    },
    updateStage() {
      this.layer.add(this.transformer);
      this.stage.add(this.layer);
    },
    checkElementConstraints() {
      switch (this.eleSelected) {
        case 1:
          this.checkFloorPos();
          break;
        case 2:
          this.checkCabinPos();
          break;
        case 3:
          this.checkChairPos();
          break;
      }
    },
    checkFloorPos() {},
    checkCabinPos() {
      let elements = this.stage.find("#myEle" + 1);
      let haveIntersection = false;
      if (elements.length) {
        elements.some((ele) => {
          if (this.haveIntersection(ele.getClientRect(), this.shape.getClientRect())) {
            haveIntersection = true;
            return true;
          }
        });
      }
      if (!haveIntersection) {
        this.eliminateCurrentEle();
      }
    },
    checkChairPos() {
      let elements = this.stage.find("#myEle" + 2);
      let haveIntersection = false;
      if (elements.length) {
        elements.some((ele) => {
          if (
            this.haveIntersection(ele.getClientRect(), this.shape.getClientRect()) &&
            !this.hasAChair(ele)
          ) {
            haveIntersection = true;
            return true;
          }
        });
      }
      if (!haveIntersection) {
        this.eliminateCurrentEle();
      }
    },
    haveIntersection(r1, r2) {
      return !(
        r2.x > r1.x + r1.width ||
        r2.x + r2.width < r1.x ||
        r2.y > r1.y + r1.height ||
        r2.y + r2.height < r1.y
      );
    },
    eliminateCurrentEle() {
      this.transformer.destroy();
      this.shape.destroy();
      this.eleInjected = false;
      this.transformer = new Konva.Transformer();
      this.updateStage();
    },
    downloadCanvasImage() {
      this.transformer.destroy();
      this.transformer = new Konva.Transformer();
      this.updateStage();
      var dataURL = this.stage.toDataURL({ pixelRatio: 3 });
      var link = document.createElement("a");
      link.download = "CanvasImage.png";
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    hasAChair(ele) {
      let elements = this.stage.find("#myEle" + 3);
      let haveIntersection = false;
      if (elements.length) {
        elements.some((el) => {
          if (
            el != this.shape &&
            this.haveIntersection(el.getClientRect(), ele.getClientRect())
          ) {
            haveIntersection = true;
            return true;
          }
        });
      }
      return haveIntersection;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#homePage {
  width: 100%;
  height: 100%;
}
#topToolbar {
  width: 100%;
  height: 10%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-wrapper {
  width: 100%;
  height: 90%;
  display: flex;
}
#sideToolbar {
  width: 50px;
  height: 100%;
  background-color: #dadada;
}
.canvas-wrapper {
  width: calc(100% - 50px);
  height: 100%;
}
#canvas {
  width: 100%;
  height: 100%;
}
.icon {
  width: 100%;
  /* height: 60px; */
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
}
.icon h1 {
  font-size: 15px;
  text-transform: capitalize;
  /* margin-bottom: 10px; */
}
.icon img {
  width: 30px;
  height: 30px;
}
.icon .floor {
  background-color: grey;
}
.btn {
   padding: 5px 10px;
  background: #dadada;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #0050b3;
  cursor: pointer;
  font-size: 12px;
  color: white;
  outline: none;
  border: none;
}
</style>
