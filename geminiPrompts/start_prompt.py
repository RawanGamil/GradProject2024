from langchain.prompts import PromptTemplate # type: ignore

prompt_template = PromptTemplate.from_template(
    """ 
This paragraph is from an individual with ADHD. Imagine you're assisting a user with ADHD in managing their tasks for the day.
The user may provide verbose or scattered input, mentioning various tasks without clear organization. Your task is to generate a concise 
and prioritized to-do list based on the user's input. 

Consider the user's ADHD condition, which may require extra clarity and structure in the response. Ensure the generated to-do list 
is easy to understand and follow, helping the user stay focused and productive despite their ADHD symptoms. Use natural language processing 
techniques to extract task details and prioritize tasks effectively. Your response should reflect empathy, understanding, and a commitment 
to supporting the user's productivity and well-being. 


important notes :
1. Provide a numbered list of tasks.
2. For tasks like submissions, appointments, and meetings, include their deadlines.
3. If a task has a known deadline, place it next to the task. If the deadline is unknown, use "NULL".
4. Indicate whether a task requires a deadline with "REQUIRED" or "NOT REQUIRED".
5. the deadline of any task outdoor is required.
6. if there are main tasks that depend on subtasks, put the subtasks before the main tasks

Strictly follow this output format:
1. First Task Name and description, Deadline: its deadline, REQUIRED.
2. Second Task Name and description, Deadline: its deadline, NOT REQUIRED.
3. Third Task Name and description, Deadline: NULL, NOT REQUIRED.

         

The paragraph:
{text}

"""
)

nextPrompt = PromptTemplate.from_template(
    """ 

You will receive a paragraph from the user and a to-do list of his tasks.
your mession is to re-order this tasks correctly based on deadlines and task dependency.
You should focus on the deadlines of the tasks if mentioned in the user paragraph.
Prioritize tasks based on urgency, importance, deadlines, task dependency, common sense.Also take into consideration time management
and user preferences if mentioned. 



important notes :
1- the generated list should be numbered.
2- use the DEADLINE provided for every task to better priotirize the tasks.
3- if there are main tasks that depend on subtasks, put the subtasks before the main tasks

Strictly follow this output format:
1. First Task Name and description, Deadline: its deadline, REQUIRED.
2. Second Task Name and description, Deadline: its deadline, NOT REQUIRED.
3. Third Task Name and description, Deadline: NULL, NOT REQUIRED.

The paragraph from user:
{text}

The to-do list:
{list}
"""
)






Second_prompt = PromptTemplate.from_template(
    """ 
Imagine you're assisting a user with ADHD in managing their tasks for the day.
The user may provide verbose or scattered input, mentioning various tasks without clear organization. Your task is to generate a concise 
and prioritized to-do list based on the user's input. 
Prioritize tasks based on urgency, importance, deadlines, task dependency, common sense. Also take into consideration time management
and user preferences if mentioned. 
Consider the user's ADHD condition, which may require extra clarity and structure in the response. Ensure the generated to-do list 
is easy to understand and follow, helping the user stay focused and productive despite their ADHD symptoms. Use natural language processing 
techniques to extract task details and prioritize tasks effectively. Your response should reflect empathy, understanding, and a commitment 
to supporting the user's productivity and well-being. 
Additionally, if necessary, you may ask the user questions about certain deadlines or task details to better prioritize and organize their 
tasks.
Notes: 
1. you may ask the user questions about certain deadlines or task details if there is a missing information to better prioritize and organize their 
tasks.
2. the list should be numbered."

{text}

"""
)
