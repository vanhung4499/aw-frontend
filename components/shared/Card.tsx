import React from 'react';

const Card = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="card w-full border border-rounded dark:bg-black dark:border-gray-600">
            {children}
        </div>
    );
};

const Title = ({ children }: { children: React.ReactNode }) => {
    return (
        <h2 className="card-title text-xl font-medium leading-none tracking-tight">
            {children}
        </h2>
    );
};

const Description = ({ children }: { children: React.ReactNode }) => {
    return <p className="text-gray-600 dark:text-gray-400 text-sm">{children}</p>;
};

const Header = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex gap-3 flex-col">{children}</div>;
};

const Body = ({ children }: { children: React.ReactNode }) => {
    return <div className="card-body dark:bg-black gap-6 p-6">{children}</div>;
};

const Footer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="card-actions justify-end dark:border-gray-600 p-3 border-t bg-gray-50 dark:bg-black">
            {children}
        </div>
    );
};

Card.Body = Body;
Card.Title = Title;
Card.Description = Description;
Card.Header = Header;
Card.Footer = Footer;

export default Card;