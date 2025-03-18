function FormField({ label, id, value, onChange, error, type = "text", ...props }) {
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        {type === "textarea" ? (
          <textarea 
            id={id}
            value={value}
            onChange={onChange}
            className={error ? 'error' : ''}
            {...props}
          />
        ) : (
          <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            className={error ? 'error' : ''}
            {...props}
          />
        )}
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  }
  
  export default FormField;