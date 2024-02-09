import React, { useState } from "react";

const PayRent = ({ instance }) => {
	const [formData, setFormData] = useState({
		address: "",
		rent: "",
		name: "",
	});
	const [spendPromise, setSpendPromise] = useState(null);

	let aci = [
		{
			"namespace": {
				"name": "ListInternal",
				"typedefs": []
			}
		},
		{
			"namespace": {
				"name": "List",
				"typedefs": []
			}
		},
		{
			"namespace": {
				"name": "String",
				"typedefs": []
			}
		},
		{
			"contract": {
				"functions": [
					{
						"arguments": [],
						"name": "init",
						"payable": false,
						"returns": "SmartRealEstate.state",
						"stateful": false
					},
					{
						"arguments": [
							{
								"name": "name",
								"type": "string"
							},
							{
								"name": "price",
								"type": "int"
							},
							{
								"name": "property_address",
								"type": "string"
							}
						],
						"name": "add_property",
						"payable": false,
						"returns": {
							"tuple": []
						},
						"stateful": true
					},
					{
						"arguments": [],
						"name": "getproperty",
						"payable": false,
						"returns": {
							"option": [
								"SmartRealEstate.rent"
							]
						},
						"stateful": false
					},
					{
						"arguments": [
							{
								"name": "owner_address",
								"type": "address"
							},
							{
								"name": "name",
								"type": "string"
							}
						],
						"name": "pay_rent",
						"payable": true,
						"returns": {
							"tuple": []
						},
						"stateful": true
					},
					{
						"arguments": [],
						"name": "get_payment_status_byowner",
						"payable": false,
						"returns": {
							"option": [
								"bool"
							]
						},
						"stateful": false
					},
					{
						"arguments": [
							{
								"name": "owner_address",
								"type": "address"
							},
							{
								"name": "name",
								"type": "string"
							}
						],
						"name": "get_tenant_address",
						"payable": false,
						"returns": {
							"option": [
								"address"
							]
						},
						"stateful": false
					},
					{
						"arguments": [],
						"name": "get_all_properties",
						"payable": false,
						"returns": "SmartRealEstate.state",
						"stateful": false
					}
				],
				"kind": "contract_main",
				"name": "SmartRealEstate",
				"payable": false,
				"state": {
					"map": [
						"address",
						"SmartRealEstate.rent"
					]
				},
				"typedefs": [
					{
						"name": "rent",
						"typedef": {
							"record": [
								{
									"name": "owner_address",
									"type": "address"
								},
								{
									"name": "tenant_address",
									"type": "address"
								},
								{
									"name": "price",
									"type": "int"
								},
								{
									"name": "is_paid",
									"type": "bool"
								},
								{
									"name": "name",
									"type": "string"
								},
								{
									"name": "property_address",
									"type": "string"
								}
							]
						},
						"vars": []
					}
				]
			}
		}
	];

	let bytecode = "cb_+QMrRgOgRmhjz8BvlqVsBB9mpuJD++o60uqgEu3DFiQbQx0e3mzAuQL9uQJU/kTWRB8ANwA3ABoOgi8AAQM//kWRHX0ANwCHAjcANwE3BkcARwAHF3d3VQIAGgoCgi8oggAHDAQBA6+CAAEAPysoAgBE/CMAAgICAP5H9Iz5BDcCRwB3NwAaCgCCLxiCAAcMFgwDr4IAAQA/DwIECD4EFARGOgYEACgsCAYgEAIHDAj7A6VQcm9wZXJ0eSBub3QgZm91bmQgZm9yIHRoZSBzcGVjaWZpZWQgbmFtZSgsBgYmAAcMDPsDUVJlbnQgaXMgYWxyZWFkeSBwYWlkKCwEBlMAIgAHDBIMAQIMA41Ob3QgZW5vdWdoIG1vbmV5IHRvIHBheSB0aGlzIHJlbnQ6IAIDEauIMtH7ACgsBAZlAQAp7hYGBv9VAhgprhoCFhgtmoKCABoBAz/7Ay1ObyBwcm9wZXJ0eSsYAABE/CMAAgICDwIECD4EFAT+f7jQVgA3AkcAd4cCNwA3AUcAGgoAgi8YggAHDAgMA6+CAAEAPw8CBAg+BAQGAQOvggABAD9GOgYEACgsAgZE/CMAAgICACsYAABE/CMAAgICDwIECD4EBAb+gcDkLAA3A3cHdzcAVQBVAAwBAgwDfwwBAAwBBCcMDA8CBFUALYqCggQBAz/+q4gy0QI3And3dzoUAAIA/sszczMANwCHAjcANwEXVQIAGgoCgi8oggAHDAgMA6+CAAEAPw8CBgg+BgQGAQOvggABAD9GOggGACgsBghE/CMAAgICACsoAgBE/CMAAgICDwIGCD4GBAb+6R0phgA3AGdHADcGRwBHAAcXd3cBAoK4oS8IEUTWRB8RaW5pdBFFkR19LWdldHByb3BlcnR5EUf0jPkhcGF5X3JlbnQRf7jQVklnZXRfdGVuYW50X2FkZHJlc3MRgcDkLDFhZGRfcHJvcGVydHkRq4gy0TkuU3RyaW5nLmNvbmNhdBHLM3MzaWdldF9wYXltZW50X3N0YXR1c19ieW93bmVyEekdKYZJZ2V0X2FsbF9wcm9wZXJ0aWVzgi8AhTcuNC4wAJX2j7o"
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: name === "rent" ? (value ? parseInt(value, 10) : "") : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const contract = await instance.initializeContract({ aci, bytecode, address: "ct_2Grjjk9MWmeWAazr8oC9mkAiki8nSKqVGJ3hAyDWCN9XVUtp8v" })
		console.log(formData.name);
		console.log(formData.address);
		console.log(formData.amount)
		console.log(instance);
		console.log(contract);
		const options1 = {
			amount: formData.amount,
			callData: "",
			fee: null,
			gas: null,
			gasPrice: 1000000000,
		};
		const args = [formData.address, formData.name];
		const options = Object.fromEntries(
			Object.entries(options1).filter(([, v]) => v != null),
		);
		console.log(args);
		console.log(options)

		contract
			?.$call("pay_rent", args, options)
			.then((result) => {
				console.log(result);
				setSpendPromise(result.hash)
				console.log(result);
			});



	};

	return (
		<div className="h-screen rounded-lg mx-4">
			<h2>Pay Rent</h2>
			<form
				onSubmit={handleSubmit}
				className="max-w-[400px] w-full bg-gray-900 p-8 px-8 border 2px white"
			>
				<h2 className="text-4xl dark:text-white font-bold text-center">
					Pay Rent
				</h2>
				<div className="flex flex-col text-gray-400 py-2">
					<label>Name</label>
					<input
						className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
						type="text"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						placeholder="Enter name"
					/>
				</div>
				<div className="flex flex-col text-gray-400 py-2">
					<label>Amount</label>
					<input
						className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
						type="Number"
						name="amount"
						value={formData.amount}
						onChange={handleInputChange}
						required
						placeholder="Enter amount"
					/>
				</div>
				<div className="flex flex-col text-gray-400 py-2">
					<label>Address</label>
					<input
						className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
						type="text"
						name="address"
						value={formData.address}
						onChange={handleInputChange}
						required
						placeholder="Enter the address"
					/>
				</div>

				<button
					type="submit"
					className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
				>
					Pay Rent
				</button>
				{spendPromise && (
					<div className="mt-4">
						<div className="font-bold text-lg mb-2">Spend result</div>
						<p className="text-gray-700">{spendPromise}</p>
					</div>
				)}
			</form>
		</div>
	);
};

export default PayRent;
