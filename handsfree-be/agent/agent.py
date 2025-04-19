# agent.py
import os
from smolagents import CodeAgent, LiteLLMModel
from agent.agent_actions import read_passenger_chat, send_message, no_tools_to_use, open_tabs, translate_answer, call_emergency, get_incoming_order_details_as_json_string, accept_or_reject_order, traffic_highlight,route_clarification, precaution_steps, continue_or_cancel_sos, phone_call, accept_or_reject_call, summarise_message, get_current_order_details

# --- Environment Variable Check ---
# LiteLLMModel will usually look for GEMINI_API_KEY automatically

if not os.environ.get("GEMINI_API_KEY"):
    print("WARNING: GEMINI_API_KEY environment variable not set.")
    print("LiteLLM might fail to authenticate with the Gemini API.")
    
# --- AI Agent Setup ---
try:
    # Define the model
    model = LiteLLMModel(model_id="gemini/gemini-2.0-flash-exp")

    # Define the agent
    agent = CodeAgent(
        tools=[send_message, open_tabs, no_tools_to_use, translate_answer, call_emergency, get_incoming_order_details_as_json_string, accept_or_reject_order, traffic_highlight, route_clarification, precaution_steps, continue_or_cancel_sos, phone_call, read_passenger_chat, accept_or_reject_call, summarise_message, get_current_order_details],
        model=model   
    )

except Exception as e:
    print(f"ERROR initializing Smol Agent: {e}")
    print("Ensure GEMINI_API_KEY is set.")
    model = None
    agent = None


# --- Agent Action Function (Optional but good practice) ---
def run_agent_query(prompt: str):
    """Runs a query using the initialized agent."""
    if agent:
        try:
            result = agent.run(prompt)
            return result
        except Exception as e:
            print(f"Error during agent execution: {e}")
            return f"Error: Could not get response from agent. {e}"
    else:
        print("Agent is not initialized, cannot run query.")
        return "Error: Agent not initialized."