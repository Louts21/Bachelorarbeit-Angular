import { Component, OnInit } from '@angular/core';
import { nominatimReverse, nominatim, getDataOfGivenURL } from '../extern/axios';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  road = "Empty";
  hamlet = "Empty";
  city = "Empty";
  lat = "0";
  lon = "0";
  databankData = {};

  inputLat = "";
  inputLon = "";
  inputStreetname = "";
  inputHousenumber = "";
  inputCity = "";
  inputDBUrl = "";

  async ngOnInit(): Promise<void> {
    let reverseAddress = await nominatimReverse('52.536940', '13.649490');
    this.road = reverseAddress.address.road;
    this.hamlet = reverseAddress.address.hamlet;
    this.city = reverseAddress.address.city;

    let address = await nominatim('12', 'Käthe-Kollwitz-Straße', 'Luckenwalde');
    this.lat = address[0].lat;
    this.lon = address[0].lon;

    this.databankData = await getDataOfGivenURL();
  }

  async submitInput(event: { target: any; }): Promise<void> {
    if (event.target.id === "nominatimReverseButton") {
      let reverseAddress = await nominatimReverse(this.inputLat, this.inputLon);
      this.road = reverseAddress.address.road;
      this.hamlet = reverseAddress.address.hamlet;
      this.city = reverseAddress.address.city;
    } else if (event.target.id === "nominatimButton") {
      let address = await nominatim(this.inputStreetname, this.inputHousenumber, this.city);
      this.lat = address[0].lat;
      this.lon = address[0].lon;
    } else if (event.target.id === "databankButton") {
      this.databankData = await getDataOfGivenURL();
    }
  }
}
