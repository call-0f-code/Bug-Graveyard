def safe_join(value):
    if isinstance(value, list):
        return " ".join(value)
    if isinstance(value, str):
        return value
    return ""
def build_text(data):
    title = data.get("title", "")
    description = data.get("description", "")
    tags_text = safe_join(data.get("tags"))
    tech_text = safe_join(data.get("techStack"))
    difficulty = data.get("difficulty", "")
    
    text = f"""
    BUG TITLE: {title}. {title}.
    BUG DESCRIPTION: {description}.
    BUG TAGS: {tags_text}.
    TECHNOLOGIES: {tech_text}.
    DIFFICULTY LEVEL: {difficulty}.
    """
    return text.lower().strip()