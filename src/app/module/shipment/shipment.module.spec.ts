import { ShipmentModule } from './shipment.module';

describe('ShipmentModule', () => {
  let shipmentModule: ShipmentModule;

  beforeEach(() => {
    shipmentModule = new ShipmentModule();
  });

  it('should create an instance', () => {
    expect(shipmentModule).toBeTruthy();
  });
});
