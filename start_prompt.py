#hello
from langchain.prompts import PromptTemplate # type: ignore

prompt_template = PromptTemplate.from_template(
    """ 
This paragraph is from an individual with ADHD. Imagine you're assisting a user with ADHD in managing their tasks for the day.
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

important notes :
1- the generated list should be numbered.
2- certain tasks you should know their deadline, like: any submission - any appointement - any meeting
3- if the task has a deadline in the paragraph, put it next to the task, if the deadline is missing put the string NULL
next to it.
4- if there is a task that requires a deadline put the string REQUIRED next to the deadline, if not put the string NOT REQUIRED next to the deadline

output format:
1. First Task Name and description, Deadline: its deadline, REQUIRED.
2. Second Task Name and description, Deadline: its deadline, NOT REQUIRED.
3. Third Task Name and description, Deadline: NULL, NOT REQUIRED.

         

The paragraph:
{text}

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