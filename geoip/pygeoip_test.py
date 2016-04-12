
import csv
import pygeoip
import codecs 
import json

def main():
    # geoip_country() 
    # geoip_city()
    readcsv()
    testEdit()
    print 'done'
 
def geoip_city():
    path = './GeoLiteCity.dat'
    gic = pygeoip.GeoIP(path)
    # print gic
    thing = gic.record_by_addr('64.233.161.99')
    print thing["city"]
    #{'city': 'Mountain View', 'region_name': 'CA', 'area_code': 650, 'longitude': -122.0574, 'country_code3': 'USA', 'latitude': 37.419199999999989, 'postal_code': '94043', 'dma_code': 807, 'country_code': 'US', 'country_name': 'United States'}
    # print gic.record_by_name('google.com')
    #{'city': 'Mountain View', 'region_name': 'CA', 'area_code': 650, 'longitude': -122.0574, 'country_code3': 'USA', 'latitude': 37.419199999999989, 'postal_code': '94043', 'dma_code': 807, 'country_code': 'US', 'country_name': 'United States'}
    # print gic.region_by_name('google.com')
    #{'region_name': 'CA', 'country_code': 'US'}
    # print gic.region_by_addr('64.233.161.99')
    #{'region_name': 'CA', 'country_code': 'US'}
 
def geoip_country(): 
    path = './GeoIP.dat'
    gi = pygeoip.GeoIP(path)
    #print gi.country_code_by_name('google.com')
    #'US'
    # print gi.country_code_by_addr('64.233.161.99')
    #'US'
    #print gi.country_name_by_name('google.com')
    #'United States'
    # print gi.country_name_by_addr('64.233.161.99')
    #'United States'
 
def readcsv():
    path = './GeoLiteCity.dat'
    gic = pygeoip.GeoIP(path)
    city = ""
    latitude = ""
    longitude = ""
    project = ""
    finalArray = []

    with open('Shuffled 300k Apache.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        # with open('Apache300kLocated.csv', 'w') as newCSV:
        with open('newJSON.txt', 'w') as outfile:
            i = 0
            fieldNames = ['Date', 'Time', 'Project','Size','City','Latitude','Longitude']
            # writer = csv.DictWriter(newCSV, fieldnames=fieldNames)
            # writer.writeheader()
            for row in reader:
                print (i)
                # print(row)
                i += 1
                if row['auroramax'] == "1":
                    project = "auroramax"
                elif row['ag0'] == "1":
                    project = "ag0"
                elif row['magneto'] == "1":
                    project = "magneto"
                elif row['themisASI'] == "1":
                    project = "themisASI"

                currentRow = gic.record_by_addr(row['IP'])
                if currentRow != None:
                    if currentRow['city'] != None:
                        city = currentRow['city'].encode('utf-8')
                    else:
                        city = "None"
                    latitude = currentRow['latitude']
                    longitude = currentRow['longitude']
                    # print(city, latitude, longitude)
                else:
                    # print("VALUE NONE - SKIPPED")
                    city = "None"
                    latitude = "None"
                    longitude = "None"
                writeDict = {"Date":row["Date"], "Time":row["Time"], "Project":project, "Size":row["reqSize"], "City":city,"Latitude":latitude,"Longitude":longitude}
                # print(writeDict)
                # writer.writerow(writeDict)
                finalArray.append(writeDict)
            # json.dump(finalArray,outfile)


def testEdit():
    with open('testCSV2.csv', 'w') as csvfile:
        fieldNames = ['Name', 'Age', 'Colour']
        writer = csv.DictWriter(csvfile, fieldnames=fieldNames)

        writer.writeheader()
        writer.writerow({'Name': "Evil Twin", 'Age':'20000', 'Colour':'Black'})



if __name__ == '__main__':
    main()