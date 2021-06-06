function dragMarker(element, offset, maxWidth, maxHeight, markerSize, counter, pointSet) {
    let elementId = element.id.split("-")[1];
    let markerSize_ = markerSize / 2.0;
    let maxWidth_ = maxWidth - markerSize_, maxHeight_ = maxHeight - markerSize_;
    let newCoordX, newCoordY;
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        if (e.button == 2) {
            element.addEventListener("contextmenu", event => {
                event.preventDefault();
                return false;
            })
            e.preventDefault();
            element.remove();
            counter.count = counter.count - 1;
            delete pointSet[elementId];
        }
        else {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        newCoordX = e.pageX - offset.left;
        if (newCoordX <= (maxWidth_ + markerSize_) && newCoordX >= 0) {
            element.style.left = (newCoordX - markerSize_) + "px";
        }
        newCoordY = e.pageY - offset.top;
        if (newCoordY <= (maxHeight_ + markerSize_) && newCoordY >= 0) {
            element.style.top = (newCoordY - markerSize_) + "px";
        }
        pointSet[elementId] = {x: newCoordX, y: newCoordY};
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        console.log("x", newCoordX, "y", newCoordY);
    }
}

function dragHorizontalLine(element, offset, maxHeight, lineWidth, counter, lineSet) {
    let elementId = element.id.split("-")[1];
    let lineWidth_ = lineWidth / 2.0;
    let maxHeight_ = maxHeight;
    let newCoordY;
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        if (e.button == 2) {
            element.addEventListener("contextmenu", event => {
                event.preventDefault();
                return false;
            })
            e.preventDefault();
            element.remove();
            counter.count = counter.count - 1;
            delete lineSet[elementId];
        }
        else {
            e = e || window.event;
            e.preventDefault();
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        newCoordY = e.pageY - offset.top;
        if (newCoordY <= maxHeight_ && newCoordY >= 0) {
            element.style.top = (newCoordY - lineWidth_) + "px";
        }
        lineSet[elementId] = {y: newCoordY};
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        console.log("y", newCoordY);
    }
}

function selectPoints(elementId, containerId, markerSize, edgeWidth, maxMarkers, pointSet) {
    
    let counter = {count: 0};
    let idCount = 0;
    let element = document.getElementById(elementId);
    let width = element.width, height = element.height;
    let boundingRect, markerId;
    let container = document.getElementById(containerId);
    let markerSize_ = markerSize / 2.0;

    element.addEventListener("click", event => {
        if (counter.count < maxMarkers) {
            boundingRect = element.getBoundingClientRect();
            let coordX = event.pageX - boundingRect.left;
            let coordY = event.pageY - boundingRect.top;
            counter.count = counter.count + 1;
            idCount = idCount + 1;
            let marker = document.createElement("div");
            marker.classList.add("marker");
            markerId = `marker-${idCount}`;
            marker.id = markerId;
            marker.style.width = `${markerSize}px`;
            marker.style.height = `${markerSize}px`;
            marker.style.left = `${coordX - markerSize_}px`;
            marker.style.top = `${coordY - markerSize_}px`;
            marker.style.borderWidth = `${edgeWidth}px`;
            pointSet[idCount] = {x: coordX, y: coordY};
            container.appendChild(marker);
            dragMarker(marker, boundingRect, width, height, markerSize, counter, pointSet);
        }
    });
}

function selectLines(elementId, containerId, maxLines, lineWidth, lineSet) {
    
    let counter = {count: 0};
    let idCount = 0;
    let element = document.getElementById(elementId);
    let width = element.width, height = element.height;
    let boundingRect, lineId;
    let container = document.getElementById(containerId);
    let lineWidth_ = lineWidth / 2.0;

    element.addEventListener("click", event => {
        if (counter.count < maxLines) {
            boundingRect = element.getBoundingClientRect()
            let coordY = event.pageY - boundingRect.top;
            counter.count = counter.count + 1;
            idCount = idCount + 1;
            let line = document.createElement("div");
            line.classList.add("line");
            lineId = `line-${idCount}`;
            line.id = lineId;
            line.style.width = `${width}px`;
            line.style.height = `${lineWidth}px`;
            line.style.left = "0px";
            line.style.top = `${coordY - lineWidth_}px`;
            lineSet[idCount] = {y: coordY};
            container.appendChild(line);
            dragHorizontalLine(line, boundingRect, height, lineWidth, counter, lineSet);
        }
    });
}
