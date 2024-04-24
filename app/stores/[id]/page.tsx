import React from 'react';

export default function StorePage({ params }: Params) {
    return <div>Hello, I am store {params.id}</div>;
};

interface Params {
    params: {
        id: string;
    };
};
