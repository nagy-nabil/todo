import React from 'react';
import type {IconType} from 'react-icons';

const InputWithIcon: React.FC<{
    Icon: IconType;
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
    placeHolder?: string;
    inputName?: string;
    defaultValue?: string;
}> = ({Icon, placeHolder, onSubmit, inputName, defaultValue}) => {
    return (
        <form
            onSubmit={onSubmit}
            className="flex relative rounded-md overflow-hidde"
        >
            <input
                type="text"
                name={inputName}
                defaultValue={defaultValue}
                className="w-full pl-2 pr-10 py-2 text-neutral rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder={placeHolder}
            />
            <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center px-3 py-2 rounded-r-lg bg-gray-200 hover:bg-gray-300 focus:outline-none"
            >
                <Icon className="text-neutral" />
            </button>
        </form>
    );
};

export default InputWithIcon;
