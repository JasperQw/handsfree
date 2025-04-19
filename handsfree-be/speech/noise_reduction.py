from df.enhance import enhance, init_df, load_audio, save_audio

model, df_state, _ = init_df()

def noise_reduction(filename: str, client_id: str) -> str:
    audio, _ = load_audio(filename, sr=df_state.sr())
    enhanced = enhance(model, df_state, audio)
    save_audio(f"enhanced_{client_id}.wav", enhanced, df_state.sr())
    return f"enhanced_{client_id}.wav"