

const HeaderItem = ({text, classs, onClick}) => {
  return (
    <div className={`${classs}`}>
        <p className="text-sm font-medium mb-[1px]" onClick={onClick}>{text}</p>
    </div>
  )
}

export default HeaderItem