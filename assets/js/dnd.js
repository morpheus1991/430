const closest = (startEl, selector) => {
  let currentEl = startEl;

  while (!currentEl.classList.contains(selector)) {
    if (currentEl.tagName === "HTML") {
      return currentEl;
    }
    currentEl = currentEl.parentElement;
  }

  return currentEl;
};

//사용법
//dnd(lsitSelector, itemClass)
//lsitSelector는 아이디도 가능
//itemClass는 오직 클래스만요.
//여러가지 목록 가능 ul.list 가 3개 각 아이템 클레스가item이라면
// dnd(".list",".item")
// dnd(".desc-list",".item")

function dnd(listselector, itemclass) {
  const createDnd = new Dnd(listselector, itemclass);
  return createDnd;
}
class Dnd {
  constructor(listSelector, itemClass) {
    const dndInfo = {
      selector: {
        listSelector: null,
        itemClass: null,
        itemClassStr: null,
      },
      element: {
        lsit: null,
        items: null,
      },
      flag: {
        drag_state: false,
        mouseMoveFlag: false,
        insertPoint: null,
      },
      index: {
        targetIndex: null,
        changeReferIndex: null,
      },
      clicked: {
        clickedX: null,
        clickedY: null,
      },

      listLocationInfo: null,
      mouseMove: {
        movingCurrentX: null,
        movingCurrentY: null,
        elementMoveX: null,
        elementMoveY: null,
      },
    };

    if (itemClass.slice(0, 1) !== ".") {
      throw new Error("Please check the item class again.");
    }
    dndInfo.selector.listSelector = listSelector;
    dndInfo.selector.itemClass = itemClass;
    dndInfo.selector.itemClassStr = dndInfo.selector.itemClass.slice(1);

    dndInfo.element.list = document.querySelector(listSelector);
    dndInfo.element.items = [
      ...dndInfo.element.list.querySelectorAll(itemClass),
    ];

    console.log(dndInfo.element.list);
    console.log(dndInfo.element.items);
    this.changeRead = (list) => {
      changeRead(list);
    };
    function changeRead(list) {
      if (list) {
        dndInfo.element.list = document.querySelector(list);
      }
      dndInfo.element.items = [
        ...dndInfo.element.list.querySelectorAll(itemClass),
      ];
      console.log(dndInfo.element.list);
      console.log(dndInfo.element.items);
    }
    // this.listElement = document.querySelector(list);
    // this.itemElements = this.listElement.querySelectorAll(item);

    if (dndInfo.element.list == null) {
      throw new Error("Please put in the list that covers the item.");
    }
    if (dndInfo.element.items == null) {
      throw new Error(
        "Item element not found.Item is a child of a list element."
      );
    }
    mousedown();
    mouseUp();
    function mousedown() {
      dndInfo.element.list.addEventListener("mousedown", (e) => {
        //눌린 클릭이 왼쪽인지 체크
        if (e.which === 1) {
          console.log("왼쪽클릭");
          changeRead(dndInfo.element.lsit);
          makelistLocation();
          //타겟이 item인지 검사
          if (e.target.classList.contains(dndInfo.selector.itemClassStr)) {
            console.log("타겟아이템임");
            const item = e.target;
            invalidAndDragRun(item);
          } else {
            console.log("타겟아이템아님");
            const item = closest(e.target, dndInfo.selector.itemClassStr);
            console.log(item);
            invalidAndDragRun(item);
          }

          function makelistLocation() {
            const listInfo = [];
            dndInfo.element.items.forEach((item) => {
              listInfo.push({
                left: item.getBoundingClientRect().left,
                top: item.getBoundingClientRect().top,
                width: item.getBoundingClientRect().width,
                height: item.getBoundingClientRect().height,
                x: item.getBoundingClientRect().x,
                y: item.getBoundingClientRect().y,
              });
            });
            dndInfo.listLocationInfo = [...listInfo];
          }
          function invalidAndDragRun(item) {
            if (item) {
              setMouseClickInfoXY();

              function setMouseClickInfoXY() {
                dndInfo.clicked.clickedX = e.clientX;
                dndInfo.clicked.clickedY = e.clientY;
                console.log(dndInfo.clicked.clickedX, dndInfo.clicked.clickedY);
              }

              console.log(dndInfo.element.items);
              dndInfo.index.targetIndex = dndInfo.element.items.indexOf(
                closest(e.target, dndInfo.selector.itemClassStr)
              );

              // console.log(item);
              if (item.tagName !== "HTML") {
                console.log("dd");
                itemDrag(item);
              }
            }
          }
        }
      });
    }
    const itemDrag = (el) => {
      dndInfo.flag.drag_state = true;
      el.classList.add("draging");
      window.addEventListener("mousemove", mouseMoveTracker);

      function drag_element() {
        console.log("마우스무브");
        if (dndInfo.flag.drag_state == false) {
          return;
        }

        const elMoveInfo = el.getBoundingClientRect();
        dndInfo.mouseMove.movingCurrentX = elMoveInfo.x;
        dndInfo.mouseMove.movingCurrentY = elMoveInfo.y;
        el.style.left = `${dndInfo.mouseMove.elementMoveX}px`;
        el.style.top = `${dndInfo.mouseMove.elementMoveY}px`;
        // console.log(mouseMovingX, mouseMovingY);
        dndInfo.listLocationInfo.forEach((item) => {
          console.log("실행");
          const index = dndInfo.listLocationInfo.indexOf(item);
          console.log(index);
          if (index !== dndInfo.index.targetIndex) {
            dndInfo.element.items = [
              ...dndInfo.element.list.querySelectorAll(".item"),
            ];
            if (
              dndInfo.mouseMove.movingCurrentY > item.y &&
              dndInfo.mouseMove.movingCurrentY < item.y + item.height
            ) {
              dndInfo.index.changeReferIndex = index;

              console.log("할당됨");
              console.log("할당됨");
              console.log(dndInfo.index.changeReferIndex);
              console.log("할당됨");
              console.log("할당됨");

              const per20 = (item.y + item.height) * 0.2;
              if (
                dndInfo.mouseMove.movingCurrentY > item.y &&
                dndInfo.mouseMove.movingCurrentY < item.y + per20
              ) {
                //top
                //   const index = listLocationInfo.indexOf(item);
                if (dndInfo.element.items) {
                  dndInfo.flag.insertPoint = "before";
                  dndInfo.element.items.forEach((item) => {
                    item.classList.remove("drag-top");
                    item.classList.remove("drag-bottom");
                  });
                  //   console.logdndInfo.element.items[index]);
                  //   console.logdndInfo.element.items[targetIndex]);
                }
                dndInfo.element.items[index].classList.add("drag-top");
              } else if (
                dndInfo.mouseMove.movingCurrentY >
                  item.y + item.height - per20 &&
                dndInfo.mouseMove.movingCurrentY < item.y + item.height
              ) {
                //bottom

                if (dndInfo.element.items) {
                  dndInfo.flag.insertPoint = "after";
                  dndInfo.element.items.forEach((item) => {
                    item.classList.remove("drag-top");
                    item.classList.remove("drag-bottom");
                  });
                }
                dndInfo.element.items[index].classList.add("drag-bottom");
                // console.log("bottom");
              }
            }
          }
          //
        });
        requestAnimationFrame(drag_element);
      }
      drag_element();
    };
    function mouseMoveTracker(e) {
      dndInfo.flag.mouseMoveFlag = true;
      dndInfo.mouseMove.elementMoveX = e.clientX - dndInfo.clicked.clickedX;
      dndInfo.mouseMove.elementMoveY = e.clientY - dndInfo.clicked.clickedY;
    }
    function mouseUp() {
      window.addEventListener("mouseup", (e) => {
        if (e.which === 1) {
          console.log("targetIndex", "changeReferIndex");
          console.log(
            dndInfo.index.targetIndex,
            dndInfo.index.changeReferIndex
          );

          if (dndInfo.flag.drag_state) {
            dndInfo.element.items[dndInfo.index.targetIndex].style.top = "0";
            dndInfo.element.items[dndInfo.index.targetIndex].style.left = "0";
            dndInfo.element.items.forEach((item) => {
              item.classList.remove("draging");
              item.classList.remove("drag-top");
              item.classList.remove("drag-bottom");
            });
            if (dndInfo.flag.insertPoint == "before") {
              dndInfo.element.list.insertBefore(
                dndInfo.element.items[dndInfo.index.targetIndex],
                dndInfo.element.items[dndInfo.index.changeReferIndex]
              );
            }
            if (dndInfo.flag.insertPoint == "after") {
              dndInfo.element.list.insertBefore(
                dndInfo.element.items[dndInfo.index.targetIndex],
                dndInfo.element.items[dndInfo.index.changeReferIndex + 1]
              );
            }

            dndInfo.flag.drag_state = false;
            dndInfo.flag.mouseMoveFlag = false;
            dndInfo.mouseMove.movingCurrentY = null;
            dndInfo.mouseMove.movingCurrentX = null;
            dndInfo.mouseMove.elementMoveX = null;
            dndInfo.mouseMove.elementMoveY = null;
            dndInfo.clicked.clickedX = null;
            dndInfo.clicked.clickedY = null;
            dndInfo.index.targetIndex = null;
            dndInfo.index.changeReferIndex = null;
            window.removeEventListener("mousemove", mouseMoveTracker, false);
          }
        }
      });
    }
  }
}
