import { useEffect, useState } from "react";
import Canvas from "react-canvas-polygons";

const DrawCanvas = ({ initialData, onChange, image }, ref) => {
	const [tool, setTool] = useState("Line");
	const handleCleanCanva = (e) => {
		e.stopPropagation();
		ref.cleanCanvas();
		setTool("Line");
		const timeout = setTimeout(() => setTool("Polygon"), 50);
		return () => clearTimeout(timeout);
	};

	useEffect(() => {
		const timeout = setTimeout(() => setTool("Polygon"), 50);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<div className="card canvas-card">
			<button
				variant="outlined"
				className="btn-dark w-100 margin-b-5"
				onClick={handleCleanCanva}
			>
				Clean Canvas
			</button>
			<Canvas
				ref={(canvas) => (ref = canvas)}
				imgSrc={image}
				color="#b30000"
				canUndo={true}
				height={1000}
				width={1000}
				tool={tool}
				onDataUpdate={(data) => onChange(data)}
				onFinishDraw={(data) => {
					onChange(data);
					console.log("finish draw");
				}}
				initialData={initialData}
			>
				<image
					overflow="visible"
					width={1000}
					height={1000}
					href={image}
				></image>
			</Canvas>
		</div>
	);
};

export default DrawCanvas;
