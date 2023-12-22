'use client';

import { useEffect, useRef, useState } from 'react';
import isAuth from './IsAuth';
import ItemCard from './ItemCard';

export default function MainSegment() {
    const [res, setRes] = useState([]);
    const [selected, setSelected] = useState(null);
    const [token, setToken] = useState(null)
    const [error, setError] = useState(null);
    const nameRef = useRef();
    const priceRef = useRef();

    const getItems = async () => {
        if (isAuth()) {
            setError(null);
            try {
                let response = await fetch('/api/get-gateway', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: token,
                    },
                })
                let json = await response.json()
                let body = JSON.parse(json.body);
                setRes(body);
            } catch (error) {
                console.log(error);
            }
        } else setError('Please Login');
    }

    useEffect(() => {
        setToken(localStorage.getItem('id_token'))
        getItems()
    }, []);

    useEffect(() => {
        console.log("RES:", res)
    }, [res])

    const handleDeleteClick = async (event, id) => {
        event?.preventDefault();

        if (!isAuth()) {
            setError('Please Login');
            return;
        }
        const r = await fetch('/api/delete-gateway', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: token,
            },
            body: JSON.stringify({
                id,
            }),
        });

        const status = r.status;
        if (status === 200) {
            let filteredRes = res.filter((value) => value.id !== id);
            setRes(filteredRes);
        }
    };

    const handlePutClick = async (event) => {
        event?.preventDefault();
        if (!isAuth()) {
            setError('Please Login');
            return;
        }
        const r = await fetch('/api/put-gateway', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: token,
            },
            body: JSON.stringify({
                id: selected,
                price: priceRef.current.value,
                name: nameRef.current.value,
            }),
        });

        const status = r.status;
        if (status === 200) {
            const response = await r.json();
            console.log(response);
            if (selected === response.id) {
                let newRes = res.map((value) => {
                    if (value.id === selected) return response;
                    else return value;
                });
                setRes(newRes);
            } else {
                setRes((prev) => [...prev, response]);
                nameRef.current.value = '';
                priceRef.current.value = '';
            }
        }
    };

    const handleSelectClick = (event, id, name, price) => {
        event?.preventDefault();
        if (id === selected) {
            setSelected(null);
            nameRef.current.value = '';
            priceRef.current.value = '';
        } else {
            setSelected(id);
            nameRef.current.value = name;
            priceRef.current.value = price;
        }
        console.log(selected);
    };

    return (
        <div className="flex w-full h-full justify-center">
            {!error ? (
                <div className="flex w-full items-start justify-center lg:h-screen">
                    <div className="container mx-auto p-4">
                        <div className="flex flex-row justify-start gap-4">
                            <input
                                ref={nameRef}
                                className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50 focus:border-1 peer h-full w-1/4 rounded-[7px] border bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0"
                                placeholder="name"
                            />
                            <input
                                ref={priceRef}
                                className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50 focus:border-1 peer h-full w-1/4 rounded-[7px] border bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0"
                                placeholder="price"
                            />
                            <button
                                className="select-none rounded-lg bg-blue-500 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                onClick={handlePutClick}
                            >
                                Put Item
                            </button>
                        </div>
                        <div className="h-5"></div>
                        <div className="grid grid-cols-1 gap-24 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                            {res.map((value) => {
                                return (
                                    <ItemCard
                                        key={value.id}
                                        id={value.id}
                                        name={value.name}
                                        price={value.price}
                                        selected={selected === value.id}
                                        handleDelete={handleDeleteClick}
                                        handleSelect={handleSelectClick}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <h1 className='text-2xl pt-8'>{error}</h1>
            )}
        </div>
    );
}
