import './index.css'

const SkillsCard = props => {
  const {skillsDetails} = props
  const {imageUrl, name} = skillsDetails
  return (
    <li className="skills-item-container">
      <div className="skills-container">
        <img src={imageUrl} alt={name} className="skill-image" />
        <p className="skill-name">{name}</p>
      </div>
    </li>
  )
}

export default SkillsCard
