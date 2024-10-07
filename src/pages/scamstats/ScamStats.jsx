// ScamStats.jsx

import React, { useEffect, useState, useMemo } from 'react';
import { Bar, Bubble } from 'react-chartjs-2';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'chart.js/auto';
import './Dashboard.css'; // Custom styles for layout
import './ScamStats.css';
import NavBar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, registerables } from 'chart.js';
import { hierarchy, pack } from 'd3-hierarchy';


Chart.register(...registerables, ChartDataLabels);

const ScamStats = () => {
    // Array of state names for the dropdown
    const stateNames = [
        "Australian Capital Territory",
        "New South Wales",
        "Northern Territory",
        "Queensland",
        "South Australia",
        "Tasmania",
        "Victoria",
        "Western Australia",
    ];

    // Array of years for the year dropdown (last 5 years as per initial code)
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);

    // State Variables
    const [geoData, setGeoData] = useState(null);  // Data for the map
    const [selectedState, setSelectedState] = useState(stateNames[0]); // Default state
    const [activeTab, setActiveTab] = useState('amountLost'); // State to manage active tab

    // Chart Data States
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Total Amount Lost',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Light Blue bars
                borderColor: 'rgba(75, 192, 192, 1)', // Blue border
                borderWidth: 1,
            },
            {
                label: 'Amount Lost by People Aged 55+',
                data: [],
                backgroundColor: 'rgba(255, 159, 64, 0.6)', // Orange bars
                borderColor: 'rgba(255, 159, 64, 1)', // Orange border
                borderWidth: 1,
            }
        ]
    });

    const [reportsData, setReportsData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Total Number of Reports',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Light Blue bars
                borderColor: 'rgba(75, 192, 192, 1)', // Blue border
                borderWidth: 1,
            },
            {
                label: 'Reports by People Aged 55+',
                data: [],
                backgroundColor: 'rgba(255, 159, 64, 0.6)', // Orange bars
                borderColor: 'rgba(255, 159, 64, 1)', // Orange border
                borderWidth: 1,
            }
        ]
    });

    // State variables for textual information
    const [totalLostSelectedYear, setTotalLostSelectedYear] = useState(0);
    const [lostByAge55SelectedYear, setLostByAge55SelectedYear] = useState(0);
    const [totalReportsSelectedYear, setTotalReportsSelectedYear] = useState(0);
    const [reportsByAge55SelectedYear, setReportsByAge55SelectedYear] = useState(0);

    // State variable for selected year
    const [selectedYear, setSelectedYear] = useState(currentYear);

    // State for Scam Type Distribution
    const [scamTypeData, setScamTypeData] = useState([]); // Array of objects [{ scam_type, count }]
    const [categoryTrendData, setCategoryTrendData] = useState([]);

    // Fetch data when selectedYear changes
    useEffect(() => {
        fetchTotalLostForYear(selectedYear);
        fetchTotalLostByAge55ForYear(selectedYear);
        fetchTotalReportsForYear(selectedYear);
        fetchReportsByAge55ForYear(selectedYear);
    }, [selectedYear]);

    // Fetch scam type data and category trends when selectedState or selectedYear changes
    useEffect(() => {
        if (selectedState) {
            fetchScamTypeData(selectedState, selectedYear);
            fetchCategoryTrendData(selectedState, selectedYear);
            fetchStateData(selectedState);
            fetchStateDataForAge55(selectedState);
            fetchReportData(selectedState);
            fetchReportDataForAge55(selectedState);
        }
    }, [selectedState, selectedYear]);

    // Fetch GeoJSON data for the map
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/rowanhogan/australian-states/master/states.geojson')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('GeoJSON data:', data);
                setGeoData(data);
            })
            .catch(error => console.error('Error loading GeoJSON:', error));
    }, []);

    // Define color for each state
    const getColorForState = (stateName) => {
        switch (stateName) {
            case "Western Australia": return "#1e7373";
            case "Northern Territory": return "#2fbebe";
            case "South Australia": return "#39e4e4";
            case "Queensland": return "#279898";
            case "New South Wales": return "#1e7373";
            case "Victoria": return "#2fbebe";
            case "Tasmania": return "#22999d";
            case "Australian Capital Territory": return "#1e7373";
            default: return "#CCCCCC";  // Default color for any undefined state
        }
    };

    // Handle the click event on a state
    const onEachState = (feature, layer) => {
        // Bind state name as a tooltip with white bold text
        layer.bindTooltip(feature.properties.STATE_NAME, {
            permanent: true,
            direction: 'center',
            className: 'state-label'
        });

        // Handle the click event on a state
        layer.on('click', () => {
            const stateName = feature.properties.STATE_NAME;
            const encodedStateName = encodeURIComponent(stateName);

            setSelectedState(stateName);

            // Fetch data when a state is clicked (optional, since useEffect handles it)
        });
    };

    // Handle state change from dropdown
    const handleStateChange = (event) => {
        const stateName = event.target.value;
        setSelectedState(stateName);
    };

    // Handle year change from dropdown
    const handleYearChange = (event) => {
        const year = parseInt(event.target.value);
        setSelectedYear(year);
    };

    // Style function for GeoJSON to apply the state colors
    const geoJsonStyle = (feature) => ({
        color: "#FFFFFF",             // Border color
        weight: 2,                    // Border thickness
        fillColor: getColorForState(feature.properties.STATE_NAME),  // State-specific color
        fillOpacity: 0.7              // Transparency
    });

    // Fetch data for the amount lost chart based on the selected state
    const fetchStateData = (state) => {
        const encodedState = encodeURIComponent(state);
        fetch(`https://v393yif444.execute-api.us-east-1.amazonaws.com/stage1/scamstats/state_stats/${encodedState}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const filteredData = data.filter(item => item.year >= (currentYear - 10));

                const chartLabels = filteredData.map(item => item.year);
                const chartValues = filteredData.map(item => item.total_lost);

                // Set chart data for total amount lost
                setChartData(prevChartData => ({
                    ...prevChartData,
                    labels: chartLabels,
                    datasets: [
                        { ...prevChartData.datasets[0], data: chartValues },
                        prevChartData.datasets[1],
                    ]
                }));
            })
            .catch(error => console.error('Error fetching state data:', error));
    };

    // Fetch data for the amount lost by people aged 55+ chart based on the selected state
    const fetchStateDataForAge55 = (state) => {
        const encodedState = encodeURIComponent(state);
        fetch(`https://v393yif444.execute-api.us-east-1.amazonaws.com/stage1/scamstats/state_stats_age_55/${encodedState}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const filteredData = data.filter(item => item.year >= (currentYear - 10));

                const chartValues = filteredData.map(item => item.total_lost_age_55);

                // Update data for people aged 55+
                setChartData(prevChartData => ({
                    ...prevChartData,
                    datasets: [
                        prevChartData.datasets[0],
                        { ...prevChartData.datasets[1], data: chartValues }
                    ]
                }));
            })
            .catch(error => console.error('Error fetching data for people aged 55+', error));
    };

    // Fetch data for the number of reports chart based on the selected state
    const fetchReportData = (state) => {
        const encodedState = encodeURIComponent(state);
        fetch(`https://v393yif444.execute-api.us-east-1.amazonaws.com/stage1/scamstats/state_reports/${encodedState}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const filteredData = data.filter(item => item.year >= (currentYear - 10));

                const chartLabels = filteredData.map(item => item.year);
                const chartValues = filteredData.map(item => item.total_reports);

                // Set reports data
                setReportsData(prevReportsData => ({
                    ...prevReportsData,
                    labels: chartLabels,
                    datasets: [
                        { ...prevReportsData.datasets[0], data: chartValues },
                        prevReportsData.datasets[1],
                    ]
                }));
            })
            .catch(error => console.error('Error fetching reports data for state:', error));
    };

    // Fetch data for the number of reports by people aged 55+ based on the selected state
    const fetchReportDataForAge55 = (state) => {
        const encodedState = encodeURIComponent(state);
        fetch(`https://v393yif444.execute-api.us-east-1.amazonaws.com/stage1/scamstats/state_reports_age_55/${encodedState}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const filteredData = data.filter(item => item.year >= (currentYear - 10));

                const chartValues = filteredData.map(item => item.total_reports_age_55);

                // Update reports data for people aged 55+
                setReportsData(prevReportsData => ({
                    ...prevReportsData,
                    datasets: [
                        prevReportsData.datasets[0],
                        { ...prevReportsData.datasets[1], data: chartValues }
                    ]
                }));
            })
            .catch(error => console.error('Error fetching report data for people aged 55+', error));
    };

    // Fetch Scam Type Distribution Data for Age 55+ only and selected year
    const fetchScamTypeData = (state, year) => {
        const encodedState = encodeURIComponent(state);
        fetch(`https://v393yif444.execute-api.us-east-1.amazonaws.com/stage1/scamstats/scam_type_distribution_age_55/${encodedState}/${year}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log('Scam Type Distribution Data:', data);

                // Sort by count descending
                const sortedData = data.sort((a, b) => b.count - a.count);

                setScamTypeData(sortedData);
            })
            .catch(error => console.error('Error fetching scam type distribution data:', error));
    };

    // Fetch category trend data for Bubble Chart
    const fetchCategoryTrendData = (state, year) => {
        const encodedState = encodeURIComponent(state);
        fetch(`https://v393yif444.execute-api.us-east-1.amazonaws.com/stage1/scamstats/scam_categories_trends/${encodedState}/${year}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log('Category Trend Data:', data);
                setCategoryTrendData(data);
            })
            .catch(error => console.error('Error fetching scam categories trends:', error));
    };

    // Fetch total amount lost in selectedYear
    const fetchTotalLostForYear = (year) => {
        fetch(`https://v393yif444.execute-api.us-east-1.amazonaws.com/stage1/scamstats/loss_stats/${year}`)
            .then(response => response.json())
            .then(data => {
                console.log(`Total Lost for ${year}:`, data.total_lost);
                setTotalLostSelectedYear(data.total_lost);
            })
            .catch(error => console.error(`Error fetching total lost for year ${year}:`, error));
    };

    // Fetch total amount lost in selectedYear by people aged 55+
    const fetchTotalLostByAge55ForYear = (year) => {
        fetch(`https://v393yif444.execute-api.us-east-1.amazonaws.com/stage1/scamstats/loss_stats_by_age_55/${year}`)
            .then(response => response.json())
            .then(data => {
                console.log(`Total Lost by Age 55+ for ${year}:`, data.total_lost_by_age_55);
                setLostByAge55SelectedYear(data.total_lost_by_age_55);
            })
            .catch(error => console.error(`Error fetching total lost by age 55 for year ${year}:`, error));
    };

    // Fetch total number of reports in selectedYear
    const fetchTotalReportsForYear = (year) => {
        fetch(`https://v393yif444.execute-api.us-east-1.amazonaws.com/stage1/scamstats/reports_stats/${year}`)
            .then(response => response.json())
            .then(data => {
                console.log(`Total Reports for ${year}:`, data.total_reports);
                setTotalReportsSelectedYear(data.total_reports);
            })
            .catch(error => console.error(`Error fetching total reports for year ${year}:`, error));
    };

    // Fetch total number of reports in selectedYear by people aged 55+
    const fetchReportsByAge55ForYear = (year) => {
        fetch(`https://v393yif444.execute-api.us-east-1.amazonaws.com/stage1/scamstats/reports_stats_by_age_55/${year}`)
            .then(response => response.json())
            .then(data => {
                console.log(`Reports by Age 55+ for ${year}:`, data.total_reports_by_age_55);
                setReportsByAge55SelectedYear(data.total_reports_by_age_55);
            })
            .catch(error => console.error(`Error fetching reports by age 55 for year ${year}:`, error));
    };

    // Compute percentages
    const percentageLostByAge55 =
        totalLostSelectedYear !== 0
            ? ((lostByAge55SelectedYear / totalLostSelectedYear) * 100).toFixed(2)
            : 0;

    const percentageReportsByAge55 =
        totalReportsSelectedYear !== 0
            ? ((reportsByAge55SelectedYear / totalReportsSelectedYear) * 100).toFixed(2)
            : 0;

    // Tab switch handler
    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
    };

    // Chart options with onClick handler and disabled datalabels
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: true, text: `Amount Lost in ${selectedState} Over the Last 10 Years` },
            datalabels: { display: false }, // Disable datalabels for Bar charts
        },
        scales: {
            y: { beginAtZero: true, title: { display: true, text: 'Amount Lost' } },
            x: { title: { display: true, text: 'Year' } },
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const chartElement = elements[0];
                const index = chartElement.index;
                const year = parseInt(chartData.labels[index]);
                setSelectedYear(year);
            }
        },
    };

    // Reports chart options with onClick handler and disabled datalabels
    const reportsChartOptions = {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: true, text: `Number of Reports in ${selectedState} Over the Last 10 Years` },
            datalabels: { display: false }, // Disable datalabels for Bar charts
        },
        scales: {
            y: { beginAtZero: true, title: { display: true, text: 'Number of Reports' } },
            x: { title: { display: true, text: 'Year' } },
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const chartElement = elements[0];
                const index = chartElement.index;
                const year = parseInt(reportsData.labels[index]);
                setSelectedYear(year);
            }
        },
    };

    const bubbleChartData = useMemo(() => {
        if (!categoryTrendData || categoryTrendData.length === 0) return { datasets: [] };

        // Aggregate counts per category
        const categoryCounts = categoryTrendData.reduce((acc, item) => {
            if (item.category_2) {
                acc[item.category_2] = (acc[item.category_2] || 0) + item.count;
            }
            return acc;
        }, {});

        // Convert to array and sort descending by count
        const sortedCategories = Object.entries(categoryCounts)
            .map(([category, count]) => ({ name: category, value: count }))
            .sort((a, b) => b.value - a.value);

        // Create a hierarchical structure required by D3's pack layout
        const root = hierarchy({ children: sortedCategories })
            .sum(d => d.value);

        const packLayout = pack()
            .size([400, 400]) // Define the size of the layout (width, height)
            .padding(5); // Padding between circles

        const packedData = packLayout(root).leaves();

        // Extract x, y, r from packedData
        const bubbles = packedData.map(d => ({
            x: d.x - 200, // Center the layout by shifting origin
            y: d.y - 200,
            r: d.r,
            category: d.data.name,
            count: d.data.value,
        }));

        // Generate distinct colors for each bubble
        const generateColor = () => {
            const hue = Math.floor(Math.random() * 360);
            return `hsla(${hue}, 70%, 50%, 0.8)`;
        };

        const backgroundColors = bubbles.map(() => generateColor());

        return {
            datasets: [{
                label: 'Scam Categories',
                data: bubbles,
                backgroundColor: backgroundColors,
            }],
        };
    }, [categoryTrendData]);


    const bubbleChartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const data = context.raw;
                        return `${data.category}: ${parseInt(data.count).toLocaleString()} reports`;
                    }
                }
            },
            title: {
                display: true,
                text: `Scam Categories in ${selectedState} (${selectedYear})`,
            },
            // Datalabels plugin to center labels inside bubbles
            datalabels: {
                display: true,
                align: 'center',
                anchor: 'center',
                formatter: function (value, context) {
                    return value.category;  // Display category name in the bubble
                },
                color: '#ffffff',  // White text to ensure it's visible on dark bubbles
                font: function (context) {
                    const radius = context.chart.data.datasets[0].data[context.dataIndex].r;
                    let size = Math.round(radius / 3); // Adjusted scaling for better fit
                    size = size > 20 ? 20 : size; // Limit max font size
                    return {
                        weight: 'bold',
                        size: size,
                    };
                },
                clip: false,  // Prevent labels from being cut off
            }
        },
        scales: {
            x: {
                display: false,  // Hide x-axis
            },
            y: {
                display: false,  // Hide y-axis
            },
        },
    };

    // Prepare data for the Horizontal Bar chart (only for age 55+ and selectedYear)
    const horizontalBarChartData = {
        labels: scamTypeData.map(item => item.scam_type),
        datasets: [
            {
                label: `Reports by People Aged 55+ in ${selectedYear}`,
                data: scamTypeData.map(item => item.count),
                backgroundColor: 'rgba(255, 159, 64, 0.6)', // Orange bars
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Horizontal Bar chart options
    const horizontalBarChartOptions = {
        indexAxis: 'y', // This will make the bar chart horizontal
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: `Distribution of Scam Types in ${selectedState} in ${selectedYear}` },
            datalabels: { display: false }, // Disable datalabels for Bar charts
        },
        scales: {
            x: { beginAtZero: true, title: { display: true, text: 'Number of Reports' } },
            y: {
                title: { display: true, text: 'Scam Type' },
                ticks: {
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0,
                    font: {
                        size: 10,
                    },
                },
            },
        },
    };

    return (
        <div>
            {/* Add NavBar at the top */}
            <div>
            <NavBar />
            </div>

            <div className="scam-stats-container" style={{ backgroundColor: '#E6F0F3', padding: '20px', borderRadius: '10px' }}>
                <div className="header-section" style={{ marginBottom: '30px', fontFamily: 'Newsreader, serif', textAlign: 'center' }}>
                    {/* <h1 style={{ fontSize: '3rem', color: '#243b53' }}>Scam Statistics Dashboard</h1> */}
                </div>

                {/* Two-Column Section */}
                <div className="two-column-layout" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    margin: '0 2rem',
                    fontFamily: 'Newsreader, serif'
                }}>
                    {/* Left Section - Map */}
                    <div className="map-section" style={{
                        flex: '1',
                        minWidth: '280px',
                        marginBottom: '20px',
                        fontFamily: 'Newsreader, serif'
                    }}>
                        <h2 style={{ fontSize: '2rem', color: '#243b53', fontFamily: 'Newsreader, serif' }}>Select a State</h2>
                        <MapContainer
                            style={{
                                height: '400px',
                                width: '100%',
                                borderRadius: '10px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                fontFamily: 'Newsreader, serif'
                            }}
                            center={[-25.2744, 133.7751]}
                            zoom={3}
                            scrollWheelZoom={false}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; OpenStreetMap contributors'
                            />
                            {geoData && (
                                <GeoJSON
                                    data={geoData}
                                    style={geoJsonStyle}  // Apply the custom style with colors
                                    onEachFeature={onEachState} // Click handler for each state and add state names
                                />
                            )}
                        </MapContainer>
                    </div>

                    {/* Right Section - Textual Info */}
                    <div className="textual-info" style={{
                        flex: '1',
                        textAlign: 'left',
                        paddingLeft: '20px',
                        minWidth: '280px',
                        fontFamily: 'Newsreader, serif'
                    }}>
                        <p style={{ fontSize: '1.75rem', color: '#243b53', fontWeight: 'bold', fontFamily: 'Newsreader, serif', marginTop: '35px' }}>
                            In <strong style={{ fontSize: '2.5rem', }}>{selectedState.toUpperCase()}</strong>,
                        </p>
                        <p style={{ fontSize: '1.5rem', color: '#5f6c7b', fontFamily: 'Newsreader, serif' }}>
                            over the past <strong>1 year</strong>, data shows that scam reports received, ranked from highest to lowest, vary by age group
                        </p>

                        <ul style={{ listStyle: 'none', padding: 0, fontFamily: 'Newsreader, serif' }}>
                            <li style={{ fontSize: '1.75rem', color: '#243b53' }}><strong>Top 1</strong> 65 and over +</li>
                            <li style={{ fontSize: '1.5rem', color: '#5f6c7b' }}><strong>Top 2</strong> 55 - 64</li>
                            <li style={{ fontSize: '1.5rem', color: '#5f6c7b' }}><strong>Top 3</strong> 35 - 44</li>
                        </ul>

                        <p style={{ fontSize: '1.25rem', color: '#5f6c7b', marginTop: '20px', fontFamily: 'Newsreader, serif' }}>
                            People aged <strong>55 and above</strong> are more likely to fall victim to scams.
                        </p>

                        <div className="next-button"
                            style={{ fontSize: '1.25rem', color: '#243b53', marginTop: '30px', cursor: 'pointer' }}
                            onClick={() => document.getElementById('scam-type-section').scrollIntoView({ behavior: 'smooth' })}
                        >
                            Next &darr;
                        </div>
                    </div>
                </div>

                {/* Tab Section */}
                <div id="scam-type-section" className="tab-section" style={{ marginBottom: '30px', textAlign: 'center' }}>
                    <button
                        className={activeTab === 'amountLost' ? 'tab active' : 'tab'}
                        onClick={() => handleTabSwitch('amountLost')}
                        style={{
                            padding: '10px 20px',
                            margin: '10px 5px',
                            border: activeTab === 'amountLost' ? '2px solid #000' : '1px solid #ccc',
                            backgroundColor: '#f9f9f9',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            fontSize: '1rem',
                            color: '#000',
                        }}
                    >
                        Amount Lost
                    </button>
                    <button
                        className={activeTab === 'reportNumber' ? 'tab active' : 'tab'}
                        onClick={() => handleTabSwitch('reportNumber')}
                        style={{
                            padding: '10px 20px',
                            margin: '10px 5px',
                            border: activeTab === 'reportNumber' ? '2px solid #000' : '1px solid #ccc',
                            backgroundColor: '#f9f9f9',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            fontSize: '1rem',
                            color: '#000',
                        }}
                    >
                        Report Number
                    </button>
                </div>

                {/* Dynamic Chart and Textual Stats Section */}
                {selectedState && (
                    <div
                        id='line-chart-stat'
                        className="stats-and-chart-section"
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            margin: '0 2rem 30px',
                        }}
                    >
                        {/* Chart Section */}
                        <div
                            className="chart-container"
                            style={{
                                flex: '1',
                                marginRight: '20px',
                                boxSizing: 'border-box',
                                margin: '0 auto',
                            }}
                        >
                            {activeTab === 'amountLost' ? (
                                <>
                                    <h2>Amount Lost in {selectedState} (Last 5 Years)</h2>
                                    <div className="chart-wrapper">
                                        <Bar
                                            data={chartData}
                                            options={{
                                                ...chartOptions,
                                                maintainAspectRatio: false,  // Allow the height to adjust dynamically
                                                responsive: true,
                                                scales: {
                                                    x: {
                                                        ticks: {
                                                            font: {
                                                                size: 12,
                                                            },
                                                            maxRotation: 0,
                                                            minRotation: 0,
                                                        },
                                                    },
                                                    y: {
                                                        ticks: {
                                                            font: {
                                                                size: 12,
                                                            },
                                                        },
                                                    },
                                                },
                                                plugins: {
                                                    legend: {
                                                        labels: {
                                                            font: {
                                                                size: 12,
                                                            },
                                                        },
                                                    },
                                                    datalabels: {
                                                        display: false,  // Disable labels on bars
                                                    },
                                                },
                                            }}
                                            height={400}  // Maintain a reasonable height for the chart
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2>Number of Reports in {selectedState} (Last 5 Years)</h2>
                                    <div className="chart-wrapper">
                                        <Bar
                                            data={reportsData}
                                            options={{
                                                ...reportsChartOptions,
                                                maintainAspectRatio: false,  // Disable to allow height adjustment
                                                responsive: true,
                                                scales: {
                                                    x: {
                                                        ticks: {
                                                            font: {
                                                                size: 12,
                                                            },
                                                            maxRotation: 0,
                                                            minRotation: 0,
                                                        },
                                                    },
                                                    y: {
                                                        ticks: {
                                                            font: {
                                                                size: 12,
                                                            },
                                                        },
                                                    },
                                                },
                                                plugins: {
                                                    legend: {
                                                        labels: {
                                                            font: {
                                                                size: 12,
                                                            },
                                                        },
                                                    },
                                                    datalabels: {
                                                        display: false,  // Disable labels on bars
                                                    },
                                                },
                                            }}
                                            height={400}
                                        />
                                    </div>
                                </>
                            )}
                        </div>


                        {/* Textual Stats */}
                        <div
                            className="textual-stats" // Correctly applied class
                            style={{
                                flex: '0 0 300px',
                                textAlign: 'left',
                                fontFamily: 'Georgia, serif',
                                color: '#243b53',
                                marginLeft: '20px',
                                marginTop: '20px',
                                minWidth: '250px',
                            }}
                        >
                            <h2 className="amount-header" style={{
                                fontSize: '2rem',
                                marginBottom: '0.5rem',
                                color: '#243b53',
                                textAlign: 'center',
                            }}>
                                In <strong>{selectedYear}</strong>,
                            </h2>
                            <p className="amount-text" style={{
                                fontSize: '2.5rem',
                                fontWeight: 'bold',
                                color: '#D9534F',
                                margin: '0.5rem 0',
                                textAlign: 'center',
                            }}>
                                {activeTab === 'amountLost'
                                    ? `$${parseFloat(totalLostSelectedYear).toLocaleString()}`
                                    : `${parseInt(totalReportsSelectedYear).toLocaleString()}`}
                            </p>
                            <p className="amount-description" style={{
                                fontSize: '1.25rem',
                                color: '#243b53',
                                marginBottom: '2rem',
                                textAlign: 'center',
                            }}>
                                {activeTab === 'amountLost' ? 'amount lost to scams' : 'reports of scams'}
                            </p>

                            <p className="percentage-text" style={{
                                fontSize: '2.5rem',
                                fontWeight: 'bold',
                                color: '#F0AD4E',
                                margin: '0.5rem 0',
                                textAlign: 'center',
                            }}>
                                {activeTab === 'amountLost'
                                    ? `$${parseFloat(lostByAge55SelectedYear).toLocaleString()}`
                                    : `${parseInt(reportsByAge55SelectedYear).toLocaleString()}`}
                            </p>

                            <p className="percentage-description" style={{
                                fontSize: '1.75rem',
                                fontWeight: 'bold',
                                color: '#F0AD4E',
                                margin: '0.5rem 0',
                                textAlign: 'center',
                            }}>
                                nearly {activeTab === 'amountLost'
                                    ? `${percentageLostByAge55}%`
                                    : `${percentageReportsByAge55}%`}
                            </p>

                            <p style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>
                                of the total are from people who are <strong style={{ fontSize: '2rem', color: '#243b53' }}>55 and over</strong>
                            </p>
                            <div className='button-section-nex' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
                                <div className="next-button"
                                    style={{ fontSize: '1.25rem', color: '#243b53', marginTop: '10px', cursor: 'pointer' }}
                                    onClick={() => {
                                        const element = document.getElementById('scam-type-chart');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        } else {
                                            console.error("Element not found: #scam-type-chart");
                                        }
                                    }}
                                >
                                    Next &darr;
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Scam Type Distribution Horizontal Bar Chart and Top 3 Scam Methods */}
                {selectedState && scamTypeData.length > 0 && (
                    <div id='scam-type-chart' className="scam-type-chart-and-stats-section" style={{
                        marginTop: '30px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        margin: '0 5rem',
                    }}>
                        {/* Chart Section */}
                        {/* Chart Section */}
                        <div style={{
                            width: '100%',
                            maxWidth: '800px',
                            flex: '1',
                            minWidth: '300px',
                            margin: '0 auto',  // Ensure the chart stays centered
                        }}>
                            <h2 style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', textAlign: 'center' }}>
                                Distribution of Scam Types in&nbsp;
                                <div style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}>
                                    <select
                                        value={selectedState}
                                        onChange={handleStateChange}
                                        style={{
                                            appearance: 'none',
                                            border: 'none',
                                            background: 'none',
                                            fontSize: 'inherit',
                                            fontFamily: 'inherit',
                                            fontWeight: 'inherit',
                                            color: 'inherit',
                                            padding: '0',
                                            margin: '0',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {stateNames.map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                    <span style={{
                                        position: 'absolute',
                                        right: '-20px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        pointerEvents: 'none',
                                        display: 'inline-block',
                                        width: '0',
                                        height: '0',
                                        borderLeft: '5px solid transparent',
                                        borderRight: '5px solid transparent',
                                        borderTop: '5px solid #000',
                                    }}></span>
                                </div>
                                &nbsp;in&nbsp;
                                <div style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}>
                                    <select
                                        value={selectedYear}
                                        onChange={handleYearChange}
                                        style={{
                                            appearance: 'none',
                                            border: 'none',
                                            background: 'none',
                                            fontSize: 'inherit',
                                            fontFamily: 'inherit',
                                            fontWeight: 'inherit',
                                            color: 'inherit',
                                            padding: '0',
                                            margin: '0',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {yearOptions.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                    <span style={{
                                        position: 'absolute',
                                        right: '-20px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        pointerEvents: 'none',
                                        display: 'inline-block',
                                        width: '0',
                                        height: '0',
                                        borderLeft: '5px solid transparent',
                                        borderRight: '5px solid transparent',
                                        borderTop: '5px solid #000',
                                    }}></span>
                                </div>
                            </h2>
                            <div className="chart-wrapper" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                                <Bar data={horizontalBarChartData} options={horizontalBarChartOptions} />
                            </div>
                        </div>

                        {/* Top 3 Scam Methods */}
                        <div style={{ width: '100%', maxWidth: '300px', paddingLeft: '20px', fontFamily: 'Georgia, serif', color: '#243b53', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '20px' }}>
                            {scamTypeData.slice(0, 3).map((method, index) => {
                                let fontSize, color;
                                if (index === 0) {
                                    fontSize = '2rem';
                                    color = '#8B0000'; // Dark Red
                                } else if (index === 1) {
                                    fontSize = '1.75rem';
                                    color = '#B22222'; // FireBrick
                                } else {
                                    fontSize = '1.5rem';
                                    color = '#CD5C5C'; // IndianRed
                                }
                                return (
                                    <div key={index} style={{ marginBottom: '20px', color: color }}>
                                        <h3 style={{ fontSize: fontSize, marginBottom: '0.5rem' }}>
                                            {index + 1}. {method.scam_type}
                                        </h3>
                                        <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                                            Reports by Age 55+: <strong style={{ color: '#D9534F' }}>{parseInt(method.count).toLocaleString()}</strong>
                                        </p>
                                    </div>
                                );
                            })}
                            <div className='button-section-nex' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <div className="next-button"
                                    style={{ fontSize: '1.25rem', color: '#243b53', marginTop: '30px', cursor: 'pointer', }}
                                    onClick={() => document.getElementById('scam-category-chart').scrollIntoView({ behavior: 'smooth' })}
                                >
                                    Next &darr;
                                </div>
                                <div className="previous-button"
                                    style={{ fontSize: '1.25rem', color: '#243b53', marginTop: '30px', cursor: 'pointer', marginLeft: '3rem' }}
                                    onClick={() => document.getElementById('line-chart-stat').scrollIntoView({ behavior: 'smooth' })}
                                >
                                    Previous &uarr;
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Scam Categories Bubble Chart */}
                {selectedState && categoryTrendData.length > 0 && (
                    <div id='scam-category-chart' className="scam-category-chart-and-text-section" style={{
                        width: '88%',
                        marginTop: '30px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginLeft: '5.3rem',
                    }}>

                        {/* Left Section: Scam Categories Bubble Chart */}
                        <div className="scam-category-chart-section" style={{ flex: '1', marginRight: '20px', minWidth: '300px' }}>
                            <h2 style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                Types of Scams in&nbsp;
                                <div style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}>
                                    <select
                                        value={selectedState}
                                        onChange={handleStateChange}
                                        style={{
                                            appearance: 'none',
                                            border: 'none',
                                            background: 'none',
                                            fontSize: 'inherit',
                                            fontFamily: 'inherit',
                                            fontWeight: 'inherit',
                                            color: 'inherit',
                                            padding: '0',
                                            margin: '0',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {stateNames.map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                    <span style={{
                                        marginRight: '20px',
                                        position: 'absolute',
                                        right: '-20px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        pointerEvents: 'none',
                                        display: 'inline-block',
                                        width: '0',
                                        height: '0',
                                        borderLeft: '5px solid transparent',
                                        borderRight: '5px solid transparent',
                                        borderTop: '5px solid #000',
                                    }}></span>
                                </div>
                                &nbsp;in&nbsp;
                                <div style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}>
                                    <select
                                        value={selectedYear}
                                        onChange={handleYearChange}
                                        style={{
                                            appearance: 'none',
                                            border: 'none',
                                            background: 'none',
                                            fontSize: 'inherit',
                                            fontFamily: 'inherit',
                                            fontWeight: 'inherit',
                                            color: 'inherit',
                                            padding: '0',
                                            margin: '0',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {yearOptions.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                    <span style={{

                                        position: 'absolute',
                                        right: '-20px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        pointerEvents: 'none',
                                        display: 'inline-block',
                                        width: '0',
                                        height: '0',
                                        borderLeft: '5px solid transparent',
                                        borderRight: '5px solid transparent',
                                        borderTop: '5px solid #000',
                                    }}></span>
                                </div>
                            </h2>

                            {/* Bubble chart for scam categories */}
                            <Bubble data={bubbleChartData} options={bubbleChartOptions} />
                        </div>

                        {/* Right Section: Textual Information */}
                        <div className="scam-category-text-section" style={{
                            flex: '0 0 350px',
                            fontFamily: 'Georgia, serif',
                            color: '#243b53',
                            textAlign: 'left',
                            marginLeft: '20px',
                            textAlign: 'center',
                        }}>
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2">Top Scam Categories</h2>

                            {categoryTrendData.length > 0 && bubbleChartData.datasets[0].data.slice(0, 3).map((dataPoint, index) => {
                                const category = dataPoint.category;
                                const count = dataPoint.count;
                                let fontSize, color;
                                switch (index) {
                                    case 0:
                                        fontSize = '2rem';
                                        color = '#8B0000'; // Dark Red for top category
                                        break;
                                    case 1:
                                        fontSize = '1.75rem';
                                        color = '#B22222'; // FireBrick for second
                                        break;
                                    case 2:
                                        fontSize = '1.5rem';
                                        color = '#CD5C5C'; // IndianRed for third
                                        break;
                                    default:
                                        fontSize = '1.5rem';
                                        color = '#000'; // Default black
                                }
                                return (
                                    <div key={index} style={{ marginBottom: '20px' }}>
                                        <h3 style={{ fontSize: fontSize, marginBottom: '0.5rem', color: color }}>
                                            {index + 1}. {category}
                                        </h3>
                                        <p style={{ fontSize: '1.25rem', color: '#243b53' }}>
                                            Reports: <strong style={{ color: '#D9534F' }}>{parseInt(count).toLocaleString()}</strong>
                                        </p>
                                    </div>
                                );
                            })}
                            <div className='button-section-nex' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

                                <div className="previous-button"
                                    style={{ fontSize: '1.25rem', color: '#243b53', marginTop: '30px', cursor: 'pointer', marginLeft: '3rem' }}
                                    onClick={() => document.getElementById('scam-type-chart').scrollIntoView({ behavior: 'smooth' })}
                                >
                                    Previous &uarr;
                                </div>
                            </div>
                        </div>
                    </div>
                )}


            </div>
            {/* Add Footer at the bottom */}
            <Footer />
        </div>
    );

};

export default ScamStats;
