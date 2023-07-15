const socket = io("http://localhost:3000");

socket.on("server:mqtt:stove:value", (res) =>
  $("#input_stove").val(res.message)
);
socket.on("server:mqtt:smoke:value", (res) =>
  $("#input_smoke").val(res.message)
);
socket.on("server:mqtt:weight:value", (res) =>
  $("#input_weight").val(res.message)
);

socket.on("server:mqtt:stove:action", (res) =>
  $("#switch_stove").prop("checked", res.message === "on")
);
socket.on("server:mqtt:smoke:action", (res) =>
  $("#switch_smoke").prop("checked", res.message === "on")
);
socket.on("server:mqtt:weight:action", (res) =>
  $("#switch_weight").prop("checked", res.message === "on")
);

$("#switch_stove").on("click", () => {
  socket.emit(
    "client:mqtt:stove:action",
    $("#switch_stove").prop("checked") ? "on" : "off"
  );
});

$("#switch_smoke").on("click", () => {
  socket.emit(
    "client:mqtt:smoke:action",
    $("#switch_smoke").prop("checked") ? "on" : "off"
  );
});

$("#switch_weight").on("click", () => {
  socket.emit(
    "client:mqtt:weight:action",
    $("#switch_weight").prop("checked") ? "on" : "off"
  );
});
