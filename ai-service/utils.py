def build_text(data):
    # Safe extraction
    title = data.get("title", "")
    description = data.get("description", "")
    tags = data.get("tags", [])
    tech_stack = data.get("techStack", [])
    difficulty = data.get("difficulty", "")
    tags_text = " ".join(tags)
    tech_text = " ".join(tech_stack)
    text = f"""
    BUG TITLE: {title}. {title}.
    BUG DESCRIPTION: {description}.
    BUG TAGS: {tags_text}.
    TECHNOLOGIES: {tech_text}.
    DIFFICULTY LEVEL: {difficulty}.
    """
    return text.lower().strip()