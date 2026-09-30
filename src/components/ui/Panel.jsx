function Panel({ eyebrow, title, action, children }){
    return(
      <section className="panel-card">
        <div className="section-heading">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2>{title}</h2>
          </div>
  
          {action}
        </div>
  
        {children}
      </section>
    )
  }
  
  export default Panel