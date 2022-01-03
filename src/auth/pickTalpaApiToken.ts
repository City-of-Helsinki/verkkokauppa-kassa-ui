function pickTalpaApiToken(obj: Record<string, string>): string {
    return obj[process.env.REACT_APP_TALPA_AUDIENCE as string];
  }
  
  export default pickTalpaApiToken;