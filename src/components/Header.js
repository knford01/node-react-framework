import { Fragment } from 'react'
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom';

const navigation = [
    { name: 'Employees', href: '/Employees' },
    { name: 'Customers', href: '/Customers' },
    { name: 'Projects', href: '/Other' },
    { name: 'Calendar', href: '/Other2' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header(props) {
    return (
        <>
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-14 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </DisclosureButton>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 items-center">
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <NavLink
                                                    key={item.name}
                                                    to={item.href}
                                                    className={({ isActive }) => {
                                                        return "px-3 py-2 rounded-md text-sm font-medium no-underline" +
                                                            (isActive ? 'text-gray-300 bg-gray-700 text-white' : 'bg-gray-900 text-white hover:bg-gray-700')
                                                    }}
                                                >
                                                    {item.name}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <button
                                        type="button"
                                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                {/* <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            /> */}
                                            </MenuButton>
                                        </div>
                                        <Transition
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <MenuItem>
                                                    {({ focus }) => (
                                                        <a
                                                            href="/Profile"
                                                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Your Profile
                                                        </a>
                                                    )}
                                                </MenuItem>
                                                <MenuItem>
                                                    {({ focus }) => (
                                                        <a
                                                            href="/Settings"
                                                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Settings
                                                        </a>
                                                    )}
                                                </MenuItem>
                                                <MenuItem>
                                                    {({ focus }) => (
                                                        <a
                                                            href="SignOut"
                                                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Sign out
                                                        </a>
                                                    )}
                                                </MenuItem>
                                            </MenuItems>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <DisclosurePanel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        className={({ isActive }) => {
                                            return "block px-3 py-2 rounded-md text-sm font-medium no-underline" +
                                                (isActive ? 'text-gray-300 bg-gray-700 text-white' : 'bg-gray-900 text-white hover:bg-gray-700')
                                        }}
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
            <div className="bg-gray-200 min-h-screen px-2 py-2">{props.children}</div>
        </>
    )
}
