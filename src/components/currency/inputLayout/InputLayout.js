import './inputLayout.css'

const InputLayout = (props) => {
    return (
        <>
        <div className="inputs-group">
            <input placeholder='0' className="inputs-amount" type="number"  value={props.amount} onChange={(e) => props.showValue(e.target.value)} />
                <select className="inputs-select-currency" value={props.currency} onChange={(e) => props.showCurrencyValue(e.target.value)}>
                    {props.currencies.length !== 0 ? 
                    Object.keys(props.currencies.rates).map((item, i) => (
                        <option key={i} value={item} >
                        {item}
                    </option> )) 
                    : null }
                </select>
        </div>
        </>   
    )
}

export default InputLayout;