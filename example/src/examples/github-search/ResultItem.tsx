export default `
export default function(props) {
    return (
        <div>
            <a href={props.item.url}>
                <img src={props.item.image} />
                <h2>{props.item.title}</h2>
                <h3>{props.item.subtitle}</h2>
            </a>
        </div>
    );
}
`;
