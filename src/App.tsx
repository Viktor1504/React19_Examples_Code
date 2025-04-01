import {ReactNode, MouseEvent} from "react";

export default function App() {
    return (
        <div className={'p-4 bg-gray-100 min-h-screen flex justify-center items-center'}>
            <Panel title="Panel 1">
                <Panel title="Panel 2">
                    <Panel title="Panel 3"/>
                </Panel>
            </Panel>
        </div>
    );
}

function Panel({title, children}: { title: string; children?: ReactNode }) {
    const handleDivClick = (e: MouseEvent<HTMLDivElement>) => {
        // Раскомментируйте e.stopPropagation(), чтобы остановить всплытие
        //e.stopPropagation();
        console.log(`Clicked: ${title}`);
    };

    return (
        <div
            // onClickCapture={handleDivClick}
            onClick={handleDivClick}
            className={`
                border-solid border-2 p-4 m-2 rounded-lg shadow-md
                hover:shadow-lg transition-shadow duration-200
                ${title === "Panel 1" ? "border-blue-500 bg-blue-50" : ""}
                ${title === "Panel 2" ? "border-green-500 bg-green-50" : ""}
                ${title === "Panel 3" ? "border-red-500 bg-red-50" : ""}
            `}
        >
            <h6
                className={`
                    m-2 text-lg font-semibold
                    ${title === "Panel 1" ? "text-blue-700" : ""}
                    ${title === "Panel 2" ? "text-green-700" : ""}
                    ${title === "Panel 3" ? "text-red-700" : ""}
                `}
            >
                {title}
            </h6>
            {children}
        </div>
    );
}