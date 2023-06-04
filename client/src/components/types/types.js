
const Types = ({typeName, setTypeName, types, setTypeId, exercisesWithType, setExercisesWirhType}) => {

    return (
        <ul className="types-exercises-list list">
            {types.types.map((type, i) =>
                <li style={{paddingBottom: '14px'}} className="list-item d-flex align-items-center justify-content-between"  key={type.id} onClick={() => {setTypeId(type.id); setTypeName(type.name); setExercisesWirhType(!exercisesWithType)}}>
                    <div style={{cursor: 'pointer'}} className="list-item__link">
                        <div className="list-item__img"><img src={'http://localhost:5001/' + type.img} alt="" /></div>
                        <div className="list-item__title">{type.name}</div>
                    </div>
                </li>    
            )}
        </ul>
    )
}

export default Types;