
export interface IEvent {
  status: 'success'|'failed',
  async:  boolean,
  source: any,
  event:  string,
  args:   IArguments,
  time:   number,
  value:  any,
}
