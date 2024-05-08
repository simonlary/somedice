import "./App.css";
import { derivative, isNumeric, typeOf } from "mathjs";
import { useMemo, useState } from "react";

function App() {
	const [expression, setExpression] = useState("x^2 + 4 * y - 5 * z");
	const [variable, setVariable] = useState("x");
	const derivative2 = useMemo(() => derivative(expression, variable), [expression, variable]);
	// const sign2 = useMemo(() => sign(derivative2), [derivative2]);

	console.log(derivative2);
	console.log(typeOf(derivative2));
	console.log(isNumeric(derivative2.toString()));
	// console.log(evaluate(derivative2.toString()));

	return (
		<>
			<div>
				<label>Expression: </label>
				<input
					type="text"
					value={expression}
					onChange={(e) => {
						setExpression(e.currentTarget.value);
					}}
				/>
			</div>
			<div>
				<label>Variable: </label>
				<input
					type="text"
					value={variable}
					onChange={(e) => {
						setVariable(e.currentTarget.value);
					}}
				/>
			</div>
			<p>
				Derivative: <span>{derivative2.toString()}</span>
				{/* Sign: <span>{sign2}</span> */}
			</p>
		</>
	);
}

export default App;
