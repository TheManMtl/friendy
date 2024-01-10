import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";
import "./VideoChat.css";

function VideoChat() {
	const [me, setMe] = useState("");
	const [stream, setStream] = useState();
	const [receivingCall, setReceivingCall] = useState(false);
	const [caller, setCaller] = useState("");
	const [callerSignal, setCallerSignal] = useState();
	const [callAccepted, setCallAccepted] = useState(false);
	const [idToCall, setIdToCall] = useState("");
	const [callEnded, setCallEnded] = useState(false);
	const [name, setName] = useState("");
	const myVideo = useRef();
	const userVideo = useRef();
	const connectionRef = useRef();
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const newSocket = io.connect("http://localhost:8080");

		newSocket.on("connect", () => {
			console.log("Socket connected successfully!");
		});

		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream);
			if (myVideo.current) {
				myVideo.current.srcObject = stream;
			}
		});

		newSocket.on("me", (id) => {
			setMe(id);
			console.log("My ID:", id);
		});

		newSocket.on("callUser", (data) => {
			setReceivingCall(true);
			setCaller(data.from);
			setName(data.name);
			setCallerSignal(data.signal);
		});

		setSocket(newSocket);

		return () => {
			// Clean up the socket connection when the component unmounts
			newSocket.disconnect();
		};
	}, []);

	const callUser = (id) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream,
		});
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name,
			});
		});
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream;
		});
		socket.on("callAccepted", (signal) => {
			setCallAccepted(true);
			peer.signal(signal);
		});

		connectionRef.current = peer;
	};

	const answerCall = () => {
		setCallAccepted(true);
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream,
		});
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller });
		});
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream;
		});

		peer.signal(callerSignal);
		connectionRef.current = peer;
	};

	const leaveCall = () => {
		setCallEnded(true);
		if (stream) {
		  const tracks = stream.getTracks();
		  tracks.forEach(track => track.stop());
		}
		setStream(null);
	  };

	return (
		<>
			<h1 style={{ textAlign: "center", color: "#000", marginTop: "2em" }}>Video Chat</h1>
			<div className="container">
				<div className="video-container">
					<div className="video-wrapper">
						<div className="video">
							{stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "450px" }} />}
						</div>
					</div>
					<div className="video-wrapper">
					<div className="video">
						{callAccepted && !callEnded ? <video playsInline ref={userVideo} autoPlay style={{ width: "450px" }} /> : null}
					</div>
				</div>
			</div>
			<div className="myId">
				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					style={{ marginBottom: "20px" }}
				/>
				<h4>Socket Id: {me}</h4>
				<input
					type="text"
					placeholder="ID to call"
					value={idToCall}
					onChange={(e) => setIdToCall(e.target.value)}
				/>
				<div className="call-button">
					{callAccepted && !callEnded ? (
						<button className="vchat-button" onClick={leaveCall}>End Call</button>
					) : (
						<button className="vchat-button" onClick={() => callUser(idToCall)}>Call</button>
					)}
					{idToCall}
				</div>
			</div>
			<div>
				{receivingCall && !callAccepted ? (
					<div className="caller">
						<h1>{name} is calling...</h1>
						<button onClick={answerCall}>Answer</button>
					</div>
				) : null}
			</div>
		</div >
		</>
	);
}

export default VideoChat;
