import React, { useState, useRef } from 'react';
import { Button } from 'antd';


const objectList = [
  { id: 1, name: 'Table', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG8sSwkziIuRGOhdRnXr1gyIZ4zunHbGPmYA&usqp=CAU' },
  { id: 2, name: 'Chair', image: 'https://www.shutterstock.com/image-illustration/orange-chair-iron-legs-top-260nw-1253729179.jpg' },
  { id: 3, name: 'Partition', image: 'https://static.vecteezy.com/system/resources/previews/007/466/870/large_2x/groove-on-dark-brown-color-wood-wall-material-burr-surface-texture-background-pattern-abstract-wooden-top-view-scene-photo.jpg' },
];

const Planner = () => {
  const canvasRef = useRef(null);
  const [objects, setObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);

  const handleObjectClick = (event, object) => {
    setSelectedObject(object);
  };

  const handleDrag = (event) => {
	return false;
  }

  const createNewObject = (event) => {
	const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.x;
    const y = event.clientY - rect.y;

    const newObjectId = objects.length > 0 ? objects[objects.length - 1].id + 1 : 1;

    const newObject = {
      id: newObjectId,
      name: selectedObject.name,
      image: selectedObject.image,
      x: x,
      y: y
    };
    setObjects(prevObjects => [...prevObjects, newObject]);
	setSelectedObject(null);
  }

  const handleDragFromMapClick = (event) => {
	const draggedElem = event.target.closest(".card-image");

	if (!draggedElem) {
	  return;
	}

	const canvas = canvasRef.current;
	const rect = canvas.getBoundingClientRect();

	const initialMouseX = event.clientX;
	const initialMouseY = event.clientY;
	const initialElementLeft = parseInt(draggedElem.style.left || "0", 10);
	const initialElementTop = parseInt(draggedElem.style.top || "0", 10);
	let newLeft = "";
	let newTop = "";

	const pointerMoveHandler = (event) => {
	  const deltaX = event.clientX - initialMouseX;
	  const deltaY = event.clientY - initialMouseY;
	  newLeft = initialElementLeft + deltaX;
	  newTop = initialElementTop + deltaY;

	  draggedElem.style.left = newLeft + "px";
	  draggedElem.style.top = newTop + "px";
	};

	const pointerUpHandler = () => {
			const id = +draggedElem.getAttribute("data-id");
			const changedObjects = objects.map(obj => (obj.id === id
			? {
				...obj,
				x: newLeft,
				y: newTop,
			}
			: obj
			)) ;
	  setObjects([...changedObjects]);
	document.body.removeEventListener("pointermove", pointerMoveHandler);
	document.body.removeEventListener("pointerup", pointerUpHandler);
	}

	document.body.addEventListener("pointermove", pointerMoveHandler);
	document.body.addEventListener("pointerup", pointerUpHandler);
  };


  const handleMapClick = event => {
	if (selectedObject) {
		createNewObject(event);
		return;
	}

	handleDragFromMapClick(event);

  };

  const handleSaveClick = () => {
    const json = JSON.stringify(objects, null, 2);

    const blob = new Blob([json], { type: 'application/json' });

    const url = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'objects.json';
    anchor.click();

    URL.revokeObjectURL(url);
    anchor.remove();
  };


  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header mb-2">
              Элементы
            </div>
            <div className="card-container">
              {objectList.map(object => (
                <div key={object.id} className={`card-wrap`} draggable onClick={event => handleObjectClick(event, object)}>
                  <img src={object.image} alt={object.name} className={`items-card ${selectedObject?.id === object.id ? "selected-object" : ""}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col">
		<Button type="primary" onClick={handleSaveClick}>
            Скачать карту заведения
        </Button>
          <div className="card mt-4">
            <div className="card-header mb-2">
              Карта заведения
            </div>
            <div className="card-body">
              <div
                ref={canvasRef}
                className="map"
                onPointerDown={handleMapClick}
				onDragStart={handleDrag}
              >
                {objects.map(object => (
                  <img
					draggable="false"
                    key={object.id}
                    src={object.image}
                    alt={object.name}
                    className="card-image position-absolute"
                    style={{ left: object.x, top: object.y }}
					data-id={object.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
