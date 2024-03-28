const EventPage = ({params}:{params: { eventName: string }}) => {
    return (
        <div>
            <h1>Event name :{params.eventName} </h1>
        </div>
    );
}

export default EventPage;