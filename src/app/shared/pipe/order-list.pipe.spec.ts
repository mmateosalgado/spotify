import { OrderListPipe } from './order-list.pipe';
import * as mockRaw from '../../data/tracks.json'
import { TrackModel } from '@core/models/tracks.models';

describe('OrderListPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderListPipe();
    expect(pipe).toBeTruthy();
  });
});


it('Testing inn and out of values',()=>{
  //Arrange
  const pipe = new OrderListPipe();
  const { data }:any=(mockRaw as any).default

  //Act
  const result: TrackModel[]=pipe.transform(data)

  //Assert
  expect(result).toEqual(data)
})

it('Testing correct asc order',()=>{
  //Arrange
  const pipe = new OrderListPipe();
  const { data }:any=(mockRaw as any).default
  const firstValue = data.find((i:any)=>i._id===7)
  const lastValue = data.find((i:any)=>i._id===6)

  //Act
  const result: TrackModel[]=pipe.transform(data,'name','asc')
  const firstResult=result[0]
  const lastResult = result[result.length-1]

  //Assert
  expect(firstResult).toEqual(firstValue)
  expect(lastResult).toEqual(lastValue)
})