export default function decoration(){
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return(
        <div className="decorationContainer">
            
                 {alphabet.map((letter, index) => (
                    <button
                      key={index}
                      className="decorationButton"
                      style={{ animationDuration:`${0.7+index*0.1}s` }}
                    >
                      <span className="decorationText">{letter}</span>
                    </button>
                  ))}
            
        </div>
    )
}