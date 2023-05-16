import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "reactstrap";
import "../../custom.css";
import { Layout } from "../Layout";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ReservationForm } from "../Forms/ReservationForm";
import ServiceTypes from "../../enums/ServiceTypes";
import { RequestTable } from "../Lists/RequestTable";
import { useAuth } from "../Functions/UserProvider";
import { useParams } from "react-router-dom";

export default function Floorplan() {
	const { hotelId, id } = useParams();
	const { cookies } = useAuth();

	const link_back = "/hotel/" + hotelId;
	const link_floorplan = "/hotel/" + hotelId + "/floorplan";
	const link_add = "/hotel/" + hotelId + "/floor-register";
	const link_room = "/hotel/" + hotelId + "/floor/";

	const [style, setStyle] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [show, setShow] = useState(false);
	const [state, setState] = useState({
		floors: [],
		currentFloorId: id,
		currentRoom: {},
	});

	const [connection, setConnection] = useState(null);
	const [requests, setRequests] = useState([]);
	const allFloors = useRef(null);
	const latestRequest = useRef(null);

	latestRequest.current = requests;
	allFloors.current = state.floors;

	const Reservation = () => {
		const handleClose = () => setShow(false);
		const style = {
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			width: "25%",
			height: "75%",
			bgcolor: "background.paper",
			border: "2px solid #b30000",
			boxShadow: 24,
			p: 4,
		};

		return (
			<Modal open={show} onClose={handleClose}>
				<Box sx={style} className="scroll">
					<h1>{state.currentRoom.number}</h1>
					<img
						src={state.currentRoom.image}
						width="100%"
						className="margin-b-5"
					/>
					<Row>
						<Col className="text-center">
							<p>
								Beds: <strong>{state.currentRoom.beds}</strong>
							</p>
						</Col>
						<Col className="text-center">
							<p>
								Type: <strong>{state.currentRoom.type}</strong>
							</p>
						</Col>
					</Row>
					{cookies.level == "Client" && (
						<ReservationForm
							userId={cookies.user}
							hotelId={hotelId}
							roomId={state.currentRoom.id}
							floorId={state.currentFloorId}
						/>
					)}
					{cookies.level != "Client" && cookies.level != undefined && (
						<RequestTable propRequests={state.currentRoom.activeRequests} />
					)}
				</Box>
			</Modal>
		);
	};

	function roomClick(room) {
		setState({ ...state, currentRoom: room });
		setShow(true);
	}

	function getServiceColor(value) {
		return ServiceTypes.find((type) => {
			return type.label == value || type.value == value;
		}).color;
	}

	useEffect(() => {
		if (cookies.name == undefined) {
			window.location.href = "/login";
		}
		fetch("api/floors/hotel/" + hotelId)
			.then((response) => response.json())
			.then((data) => {
				setState({ ...state, floors: data });
				setLoaded(true);
			});

		const newConnection = new HubConnectionBuilder()
			.withUrl("https://localhost:7299/hubs/requests", {
				skipNegotiation: true,
				transport: HttpTransportType.WebSockets,
			})
			.withAutomaticReconnect()
			.build();
		setConnection(newConnection);
	}, []);

	useEffect(() => {
		state.floors.map((floor) => {
			floor.rooms.map((room) => {
				const filling =
					room.activeRequests.length > 0 &&
					cookies.level != "Client" &&
					cookies.level != undefined
						? getServiceColor(
								room.activeRequests[room.activeRequests.length - 1].type
						  )
						: "#79ff4d";
				setStyle((st) => ({
					...st,
					[room.id]: {
						fill: filling,
						opacity: "95%",
						stroke: "black",
						strokeWidth: "2",
					},
				}));
			});
		});
	}, [loaded]);

	useEffect(() => {
		if (connection) {
			connection
				.start()
				.then((result) => {
					console.log("Connected!");
					connection.on("ReceiveRequest", (request) => {
						const updatedRequest = [...latestRequest.current];
						updatedRequest.push(request);
						setRequests(updatedRequest);
						console.log(request);
						if (request.sender.hotelId == hotelId) {
							setShow(false);
							const room = allFloors.current
								.find((floor) => {
									return floor.id == request.sender.floorId;
								})
								.rooms.find((room) => {
									return room.id == request.sender.roomId;
								});
							room.activeRequests.push(request);
							setState({ ...state, floors: allFloors.current });
							if (cookies.level != "Client" || cookies.hotel == hotelId) {
								console.log(cookies.level);
								console.log(cookies.level != "Client");
								setStyle((st) => ({
									...st,
									[room.id]: {
										fill: getServiceColor(
											room.activeRequests[room.activeRequests.length - 1].type
										),
										opacity: "95%",
										stroke: "#a6a6a6",
										strokeWidth: "2",
									},
								}));
							}
						}
					});
				})
				.catch((e) => {
					console.log("Connection failed: ", e);
				});
		}
	}, [connection]);

	const Render = () => {
		return (
			<Layout>
				<Reservation />
				<div className="w-100 d-table">
					<h1 id="header" className="d-table-cell">
						Floorplan
					</h1>
					<div className="d-table-cell text-r">
						<button
							className="btn btn-dark"
							onClick={(e) => (window.location.href = link_back)}
						>
							Back
						</button>
					</div>
				</div>
				<div className="form-group">
					<div className="w-100 d-table">
						<div className="d-table-cell m-1">
							<label className="margin-r-5">Floor:</label>
							<select
								name="floor"
								className="d-inline form-select w-50 margin-r-5"
								value={state.currentFloorId}
								onChange={(e) => {
									setState({ ...state, currentFloorId: e.target.value });
									let link =
										e.target.value == 0
											? link_floorplan
											: link_floorplan + "/" + e.target.value;
									window.location.href = link;
								}}
							>
								<option value="0">Select floor</option>
								{state.floors.map((floor) => (
									<option
										defaultValue={id === floor.id}
										value={floor.id}
										key={floor.id}
									>
										{floor.number}
									</option>
								))}
							</select>
							{cookies.level == "Admin" && (
								<>
									<button
										className="btn btn-dark w-100p margin-2"
										onClick={(e) => (window.location.href = link_add)}
									>
										Add new
									</button>
									<button
										className="btn btn-dark w-120p margin-2"
										onClick={(e) =>
											(window.location.href = link_room + state.currentFloorId)
										}
										disabled={
											state.currentFloorId == 0 ||
											state.currentFloorId == undefined
										}
									>
										Add room
									</button>
								</>
							)}
						</div>
					</div>
					{state.currentFloorId != 0 && state.currentFloorId != undefined ? (
						<svg xmlns="http://www.w3.org/2000/svg" width={1000} height={1000}>
							<image
								display="flex"
								overflow="visible"
								width={1000}
								height={1000}
								href={
									state.floors.find((floor) => {
										return floor.id == state.currentFloorId;
									}).floorplan
								}
							/>
							{state.floors
								.find((floor) => {
									return floor.id == state.currentFloorId;
								})
								.rooms.map((room) => (
									<polygon
										key={room.id}
										points={room.border}
										style={style[`${room.id}`]}
										onClick={(e) => roomClick(room)}
									/>
								))}
						</svg>
					) : (
						<div>
							{state.floors.map((floor) => {
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={1000}
										height={1000}
									>
										<image
											display="flex"
											overflow="visible"
											width={1000}
											height={1000}
											href={floor.floorplan}
										/>
										{floor.rooms.map((room) => (
											<polygon
												key={room.id}
												points={room.border}
												style={style[`${room.id}`]}
												onClick={(e) => roomClick(room)}
											/>
										))}
									</svg>
								</div>;
							})}
						</div>
					)}
				</div>
			</Layout>
		);
	};

	return <>{loaded && <Render />}</>;
}
