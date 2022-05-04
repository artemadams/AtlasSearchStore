import React, { useState, useEffect, useRef } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { Fragment } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { ShoppingCartIcon, MenuIcon, SearchIcon, UserIcon } from "@heroicons/react/outline";
import LoginDialog from "./LoginDialog";
import { registerUser, addProduct, getUser } from "../RealmService";

const Header = ({ searchTerm, setSearchTerm }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [autoComplete, setAutoComplete] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const initial = useRef(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayedUser, setDisplayedUser] = useState("");

    function closeModal() {
        setIsLoginOpen(false);
    }

    function openModal() {
        setIsLoginOpen(true);
    }

    const signUp = async () => {
        await registerUser(email, password);
        const user = await getUser();
        setDisplayedUser(user.profile.email);
        console.log(displayedUser);
        setIsLoggedIn(true);
        closeModal();
    };

    const langs = [
        { name: "🇩🇪 German" },
        { name: "🇬🇧 English" },
        { name: "🇪🇸 Spanish" },
        { name: "🇰🇷 Korean" },
        { name: "🇯🇵 Japanese" },
    ];
    const [selectedLang, setSelectedLang] = useState(langs[1]);

    const Suggestions_AC_Endpoint = "https://data.mongodb-api.com/app/mongostoreapp-dnerj/endpoint/names";

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("SEARCHTERM: ", searchTerm);
        setShowSuggestions(false);
    };

    const fetchAC_Names = async (searchTerm) => {
        let autocomplete_names_endpoint = Suggestions_AC_Endpoint;
        if (searchTerm) {
            autocomplete_names_endpoint = autocomplete_names_endpoint + `?searchName=${searchTerm}`;
        }
        try {
            let productNames = await (await fetch(autocomplete_names_endpoint)).json();
            console.log(productNames);

            setAutoComplete(productNames);
            console.log("NAMES: ", autoComplete.length);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (initial.current) {
            initial.current = false;
            return;
        }
        // BUILD OUT AUTOCOMPLETE TERMS
        if (searchTerm === "") setShowSuggestions(false);
        if (searchTerm !== "" && searchTerm.length > 3) {
            fetchAC_Names(searchTerm);

            if (autoComplete.length !== 0) {
                setShowSuggestions(true);
                return;
            }
            setShowSuggestions(false);
        }
        return;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    const handleSelect = (name) => {
        setSearchTerm(name);
        setShowSuggestions(false);
        setAutoComplete([]);
    };

    return (
        <>
            <header>
                <div className="container mx-auto px-6 py-3">
                    <div className="flex items-center justify-between">
                        <div href="/">
                            <div className="w-full text-green-500 text-2xl font-semibold cursor-pointer">
                                MongoStore
                            </div>
                        </div>
                        <div className="flex items-center justify-end w-full">
                            {isLoggedIn && (
                                <div className="mr-5 text-gray-600 font-medium text-base">
                                    Hi, {displayedUser}
                                </div>
                            )}
                            <button className="text-gray-600 focus:outline-none mx-4 sm:mx-0">
                                <UserIcon onClick={() => openModal()} className="h-5 w-5 mr-5" />
                            </button>
                            <button className="text-gray-600 focus:outline-none mx-4 sm:mx-0">
                                <ShoppingCartIcon
                                    onClick={() => setIsCartOpen(!isCartOpen)}
                                    className="h-5 w-5"
                                />
                            </button>
                            <div className="ml-5 w-36 z-50">
                                <Listbox value={selectedLang} onChange={setSelectedLang}>
                                    <div className="relative mt-1">
                                        <Listbox.Button className="focus:outline-none relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                            <span className="block truncate">{selectedLang.name}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <SelectorIcon
                                                    className="h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
                                                {langs.map((lang, langIdx) => (
                                                    <Listbox.Option
                                                        key={langIdx}
                                                        className={({ active }) =>
                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                active
                                                                    ? "bg-amber-100 text-amber-900"
                                                                    : "text-gray-900"
                                                            }`
                                                        }
                                                        value={lang}
                                                    >
                                                        {({ selectedLang }) => (
                                                            <>
                                                                <span
                                                                    className={`block truncate ${
                                                                        selectedLang === lang
                                                                            ? "font-medium"
                                                                            : "font-normal"
                                                                    }`}
                                                                >
                                                                    {lang.name}
                                                                </span>
                                                                {selectedLang === lang ? (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                        <CheckIcon
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </div>
                            <div className="flex sm:hidden">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    type="button"
                                    className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                                    aria-label="toggle menu"
                                >
                                    <MenuIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <nav
                        className={`${
                            isMenuOpen ? "" : "hidden"
                        } sm:flex sm:justify-center sm:items-center mt-4`}
                    >
                        <div className="flex flex-col sm:flex-row">
                            <div className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                                <div href="/">Home</div>
                            </div>
                            <div className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                                <div href="/products">Shop</div>
                            </div>
                            <div className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="#">
                                <div href="/products/category">Categories</div>
                            </div>
                            <a
                                className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
                                href="www.mongodb.com"
                            >
                                Contact
                            </a>
                            <a
                                className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
                                href="www.mongodb.com"
                            >
                                About
                            </a>
                        </div>
                    </nav>

                    <div className="relative mt-6 max-w-lg mx-auto">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                            <SearchIcon className="h-5 w-5" />
                        </span>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-green-500 focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Search"
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                            />
                        </form>
                        {showSuggestions && (
                            <ul className="absolute inset-x-0 top-full border border-green-600 bg-white rounded-md z-20">
                                {autoComplete.map((item) => {
                                    return (
                                        <li
                                            key={item._id}
                                            className="px-4 py-2 hover:bg-yellow-100 cursor-pointer border-b "
                                            onClick={() => handleSelect(item.name)}
                                        >
                                            {item.name}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>
            </header>

            <Transition appear show={isLoginOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        ✨ Sign Up for new offers
                                    </Dialog.Title>
                                    <div className="mt-1 mb-2">
                                        <p className="text-sm text-gray-500">
                                            Register with your email and pasword to get access to MongoStore.
                                        </p>
                                    </div>

                                    <form>
                                        <label className="block">
                                            <span className="block text-sm font-medium text-slate-700">
                                                Email
                                            </span>
                                            <input
                                                type="text"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                            />
                                        </label>
                                        <label className="block">
                                            <span className="mt-2 block text-sm font-medium text-slate-700">
                                                Password
                                            </span>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                            />
                                        </label>
                                    </form>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            disabled={email === "" || password === ""}
                                            className="focus:outline-none inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed float-right"
                                            onClick={signUp}
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* <LoginDialog isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} /> */}
        </>
    );
};

export default Header;
