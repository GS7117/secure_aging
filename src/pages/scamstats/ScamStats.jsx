// ScamStats.jsx

import React, { useEffect, useState, useMemo } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'chart.js/auto';
import './Dashboard.css'; // Custom styles for layout
import './ScamStats.css';
import NavBar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer';

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
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Light Blue fill
                borderColor: 'rgba(75, 192, 192, 1)', // Blue line
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Amount Lost by People Aged 55+',
                data: [],
                backgroundColor: 'rgba(255, 159, 64, 0.2)', // Orange fill
                borderColor: 'rgba(255, 159, 64, 1)', // Orange line
                fill: true,
                tension: 0.4,
            }
        ]
    });

    const [reportsData, setReportsData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Total Number of Reports',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Light Blue fill
                borderColor: 'rgba(75, 192, 192, 1)', // Blue line
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Reports by People Aged 55+',
                data: [],
                backgroundColor: 'rgba(255, 159, 64, 0.2)', // Orange fill
                borderColor: 'rgba(255, 159, 64, 1)', // Orange line
                fill: true,
                tension: 0.4,
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
                console.log('GeoJSON data:', data);  // 调试时查看数据
                setGeoData(data);  // 将 GeoJSON 数据设置到状态中
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
            permanent: true,  // Always show the label
            direction: 'center',  // Center the label on the state
            className: 'state-label'  // Apply a custom CSS class for the label
        });
    
        // Handle the click event on a state
        layer.on('click', () => {
            const stateName = feature.properties.STATE_NAME;  // 获取州名
            const encodedStateName = encodeURIComponent(stateName);  // 对州名进行 URL 编码
    
            setSelectedState(stateName); // 更新选择的州
    
            // 发起请求时使用编码后的州名
            fetch(`https://v393yif444.execute-api.us-east-1.amazonaws.com/stage1/scamstats/state_stats/${encodedStateName}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('State Data:', data);
                    // 在这里处理数据，例如更新图表等
                })
                .catch(error => console.error('Error fetching state data:', error));
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
        const encodedState = encodeURIComponent(state);  // 对州名进行 URL 编码
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
        const encodedState = encodeURIComponent(state);  // 对州名进行 URL 编码
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
    
                // 更新 55 岁及以上人群的数据
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
        const encodedState = encodeURIComponent(state);  // 对州名进行 URL 编码
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
    
                // 设置报告数据
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
        const encodedState = encodeURIComponent(state);  // 对州名进行 URL 编码
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
    
                // 更新55岁及以上人群的报告数据
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
        const encodedState = encodeURIComponent(state);  // 对州名进行 URL 编码
        fetch(`https://v393yif444.execute-api.us-east-1.amazonaws.com/stage1/scamstats/scam_type_distribution_age_55/${encodedState}/${year}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log('Scam Type Distribution Data:', data); // Debugging line
    
                // 按照 scam type 的计数从大到小排序
                const sortedData = data.sort((a, b) => b.count - a.count);
    
                setScamTypeData(sortedData); // 更新 scam type 数据
            })
            .catch(error => console.error('Error fetching scam type distribution data:', error));
    };
    

    // Fetch category trend data for Area Chart (number of scams per category_2 per month)
    const fetchCategoryTrendData = (state, year) => {
        const encodedState = encodeURIComponent(state);  // 对州名进行 URL 编码
        fetch(`https://v393yif444.execute-api.us-east-1.amazonaws.com/stage1/scamstats/scam_categories_trends/${encodedState}/${year}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log('Category Trend Data:', data); // 调试用
                setCategoryTrendData(data); // 更新趋势数据
            })
            .catch(error => console.error('Error fetching scam categories trends:', error));
    };
    

    // Fetch total amount lost in selectedYear
    const fetchTotalLostForYear = (year) => {
        fetch(`https://v393yif444.execute-api.us-east-1.amazonaws.com/stage1/scamstats/loss_stats/${year}`)
            .then(response => response.json())
            .then(data => {
                console.log(`Total Lost for ${year}:`, data.total_lost); // Debugging line
                setTotalLostSelectedYear(data.total_lost);
            })
            .catch(error => console.error(`Error fetching total lost for year ${year}:`, error));
    };

    // Fetch total amount lost in selectedYear by people aged 55+
    const fetchTotalLostByAge55ForYear = (year) => {
        fetch(`https://v393yif444.execute-api.us-east-1.amazonaws.com/stage1/scamstats/loss_stats_by_age_55/${year}`)
            .then(response => response.json())
            .then(data => {
                console.log(`Total Lost by Age 55+ for ${year}:`, data.total_lost_by_age_55); // Debugging line
                setLostByAge55SelectedYear(data.total_lost_by_age_55);
            })
            .catch(error => console.error(`Error fetching total lost by age 55 for year ${year}:`, error));
    };

    // Fetch total number of reports in selectedYear
    const fetchTotalReportsForYear = (year) => {
        fetch(`https://v393yif444.execute-api.us-east-1.amazonaws.com/stage1/scamstats/reports_stats/${year}`)
            .then(response => response.json())
            .then(data => {
                console.log(`Total Reports for ${year}:`, data.total_reports); // Debugging line
                setTotalReportsSelectedYear(data.total_reports);
            })
            .catch(error => console.error(`Error fetching total reports for year ${year}:`, error));
    };

    // Fetch total number of reports in selectedYear by people aged 55+
    const fetchReportsByAge55ForYear = (year) => {
        fetch(`https://v393yif444.execute-api.us-east-1.amazonaws.com/stage1/scamstats/reports_stats_by_age_55/${year}`)
            .then(response => response.json())
            .then(data => {
                console.log(`Reports by Age 55+ for ${year}:`, data.total_reports_by_age_55); // Debugging line
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

    // Chart options with onClick handler
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: true, text: `Amount Lost in ${selectedState} Over the Last 10 Years` },
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

    // Reports chart options with onClick handler
    const reportsChartOptions = {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: true, text: `Number of Reports in ${selectedState} Over the Last 10 Years` },
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

    // Compute top categories using useMemo
    const topCategoriesComputed = useMemo(() => {
        if (!categoryTrendData || categoryTrendData.length === 0) return [];

        // Aggregate counts per category_2
        const categoryCounts = categoryTrendData.reduce((acc, item) => {
            acc[item.category_2] = (acc[item.category_2] || 0) + item.count;
            return acc;
        }, {});

        // Convert to array and sort descending
        const sortedCategories = Object.entries(categoryCounts)
            .map(([category, count]) => ({ category, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5); // Top 5 categories

        return sortedCategories;
    }, [categoryTrendData]);

    // Prepare Category Chart Data using useMemo
    const categoryChartData = useMemo(() => {
        if (!categoryTrendData || categoryTrendData.length === 0) return { datasets: [], totalScamsForYear: 0 };

        // Calculate total scams for the year
        const totalScamsForYear = categoryTrendData.reduce((total, item) => total + item.count, 0);

        // Prepare datasets based on topCategoriesComputed
        const datasets = topCategoriesComputed.map((categoryObj, idx) => {
            const { category, count } = categoryObj;
            // Filter data for this category
            const categoryData = categoryTrendData.filter(item => item.category_2 === category);

            // Initialize data array for 12 months
            const data = Array(12).fill(0);
            categoryData.forEach(item => {
                const monthIndex = item.month - 1; // Months are 1-12
                if (!isNaN(monthIndex)) {
                    data[monthIndex] += item.count;
                }
            });

            // Define colors
            const colors = [
                'rgba(75, 192, 192, 0.4)',   // Teal
                'rgba(255, 99, 132, 0.4)',   // Red
                'rgba(255, 206, 86, 0.4)',   // Yellow
                'rgba(54, 162, 235, 0.4)',   // Blue
                'rgba(153, 102, 255, 0.4)',  // Purple
            ];

            const borderColors = [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
            ];

            return {
                label: category,
                data: data,
                backgroundColor: colors[idx % colors.length],
                borderColor: borderColors[idx % borderColors.length],
                fill: true,
                tension: 0.4,
            };
        });

        // Prepare month labels
        const monthLabels = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'short' }));

        return {
            labels: monthLabels,
            datasets: datasets,
            totalScamsForYear: totalScamsForYear,
        };
    }, [categoryTrendData, topCategoriesComputed]);
    {
        categoryTrendData.slice(0, 3).map((category, index) => {
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
                        {index + 1}. {category.category_2}
                    </h3>
                    <p style={{ fontSize: '1.25rem', color: '#243b53' }}>
                        Reports: <strong style={{ color: '#D9534F' }}>{parseInt(category.count, 10).toLocaleString()}</strong>
                    </p>
                </div>
            );
        })
    }


    const categoryChartOptions = {
        responsive: true,
        plugins: {
            legend: { display: true, position: 'top' },
            title: {
                display: true,
                text: `Monthly Scam Trends by Category in ${selectedState} (${selectedYear})`,
                font: { size: 18 },
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
            filler: {
                propagate: true,
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
        },
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Number of Scams' },
                stacked: false, // Set to true if you want a stacked area chart
            },
            x: {
                title: { display: true, text: 'Months' },
                stacked: false, // Set to true if you want a stacked area chart
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

    // Compute percentages
    // Removed duplicate declaration here
    // const percentageReportsByAge55 = ... (only declare once)

    return (
        <div>
            {/* Add NavBar at the top */}
            <NavBar />

            <div className="scam-stats-container" style={{ backgroundColor: '#E6F0F3', padding: '20px', borderRadius: '10px' }}>
                <div className="header-section" style={{ marginBottom: '30px', fontFamily: 'Newsreader, serif' }}>
                    <h1 style={{ fontSize: '3rem', color: '#243b53' }}>Scam Statistics Dashboard</h1>
                    {/* Placeholder for Year Dropdown if needed */}
                </div>

                {/* Two-Column Section */}
                <div className="two-column-layout" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginLeft: '5rem', marginRight: '5rem', fontFamily: 'Newsreader, serif' }}>

                    {/* Left Section - Textual Info */}
                    <div className="textual-info" style={{ flex: '1', textAlign: 'left', paddingRight: '40px', fontFamily: 'Newsreader, serif' }}>
                        <h2 style={{ fontSize: '2rem', color: '#243b53', marginBottom: '20px' }}>
                            Please select your state:
                        </h2>

                        <p style={{ fontSize: '1.75rem', color: '#243b53', fontWeight: 'bold', fontFamily: 'Newsreader, serif' }}>
                            In <strong style={{ fontSize: '2.5rem', }}>VICTORIA</strong>,
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

                    {/* Right Section - Map */}
                    <div className="map-section" style={{ flex: '1', fontFamily: 'Newsreader, serif' }}>
                        <h2 style={{ fontSize: '2rem', color: '#243b53', fontFamily: 'Newsreader, serif' }}>Select a State</h2>
                        <MapContainer
                            style={{ height: '400px', width: '100%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', fontFamily: 'Newsreader, serif' }}
                            center={[-25.2744, 133.7751]}
                            zoom={4}
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
                </div>

                {/* Tab Section */}
                <div id="scam-type-section" className="tab-section" style={{ marginBottom: '30px' }}>
                    <button
                        className={activeTab === 'amountLost' ? 'tab active' : 'tab'}
                        onClick={() => handleTabSwitch('amountLost')}
                        style={{
                            padding: '10px 20px',
                            marginRight: '10px',
                            border: activeTab === 'amountLost' ? '2px solid #000' : '1px solid #ccc',
                            backgroundColor: activeTab === 'amountLost' ? '#fff' : '#f9f9f9',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            fontSize: '1rem',
                        }}
                    >
                        Amount Lost
                    </button>
                    <button
                        className={activeTab === 'reportNumber' ? 'tab active' : 'tab'}
                        onClick={() => handleTabSwitch('reportNumber')}
                        style={{
                            padding: '10px 20px',
                            border: activeTab === 'reportNumber' ? '2px solid #000' : '1px solid #ccc',
                            backgroundColor: activeTab === 'reportNumber' ? '#fff' : '#f9f9f9',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            fontSize: '1rem',
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
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            flexWrap: 'nowrap', // Ensure side by side alignment
                            marginBottom: '30px',
                            marginLeft: '5rem', marginRight: '5rem',
                        }}
                    >
                        {/* Chart Section */}
                        <div style={{ flex: '1', marginRight: '20px', minWidth: '300px' }}>
                            {activeTab === 'amountLost' ? (
                                <>
                                    <h2>Amount Lost in {selectedState} (Last 5 Years)</h2>
                                    <Line
                                        data={chartData}
                                        options={chartOptions}
                                    />
                                </>
                            ) : (
                                <>
                                    <h2>Number of Reports in {selectedState} (Last 5 Years)</h2>
                                    <Line
                                        data={reportsData}
                                        options={reportsChartOptions}
                                    />
                                </>
                            )}
                        </div>

                        {/* Textual Stats */}
                        <div
                            className="textual-stats"
                            style={{
                                flex: '0 0 350px',
                                textAlign: 'left',
                                fontFamily: 'Georgia, serif',
                                color: '#243b53',
                                marginLeft: '20px',
                                minWidth: '250px',
                            }}
                        >
                            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#243b53' }}>
                                In <strong>{selectedYear}</strong>,
                            </h2>
                            <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#D9534F', margin: '0.5rem 0' }}>
                                {activeTab === 'amountLost'
                                    ? `$${parseFloat(totalLostSelectedYear).toLocaleString()}`
                                    : `${parseInt(totalReportsSelectedYear).toLocaleString()}`}
                            </p>
                            <p style={{ fontSize: '1.25rem', color: '#243b53', marginBottom: '2rem' }}>
                                {activeTab === 'amountLost' ? 'amount lost to scams' : 'reports of scams'}
                            </p>

                            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#F0AD4E', margin: '0.5rem 0' }}>
                                {activeTab === 'amountLost'
                                    ? `$${parseFloat(lostByAge55SelectedYear).toLocaleString()}`
                                    : `${parseInt(reportsByAge55SelectedYear).toLocaleString()}`}
                            </p>

                            <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#F0AD4E', margin: '0.5rem 0' }}>
                                nearly {activeTab === 'amountLost'
                                    ? `${percentageLostByAge55}%`
                                    : `${percentageReportsByAge55}%`}
                            </p>

                            <p style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>
                                of the total are from people who are <strong style={{ fontSize: '2rem', color: '#243b53' }}>55 and over</strong>
                            </p>
                            <div className='button-section-nex' style={{ display: 'flex' }}>
                                <div className="next-button"
                                    style={{ fontSize: '1.25rem', color: '#243b53', marginTop: '30px', cursor: 'pointer' }}
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
                    <div id='scam-type-chart' className="scam-type-chart-and-stats-section" style={{ marginTop: '30px', display: 'flex', marginLeft: '5rem', marginRight: '5rem', }}>
                        {/* Chart Section */}
                        <div style={{ width: '66%' }}>
                            <h2 style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
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
                                        marginRight: '20px',
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
                            <Bar data={horizontalBarChartData} options={horizontalBarChartOptions} />
                        </div>

                        {/* Top 3 Scam Methods */}
                        <div style={{ width: '33%', paddingLeft: '20px', fontFamily: 'Georgia, serif', color: '#243b53', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
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
                            <div className='button-section-nex' style={{ display: 'flex' }}>
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

                {/* Scam Categories Area Chart */}
                {selectedState && categoryTrendData.length > 0 && (
                    <div id='scam-category-chart' className="scam-category-chart-and-text-section" style={{ width: '88%', marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginLeft: '5.3rem' }}>

                        {/* Left Section: Scam Categories Area Chart */}
                        <div className="scam-category-chart-section" style={{ flex: '1', marginRight: '20px' }}>
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

                            {/* Line chart for scam trends by category (Area Chart) */}
                            <Line data={categoryChartData} options={categoryChartOptions} />
                        </div>

                        {/* Right Section: Textual Information */}
                        <div className="scam-category-text-section" style={{ flex: '0 0 350px', fontFamily: 'Georgia, serif', color: '#243b53', textAlign: 'left', marginLeft: '20px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Top Scam Categories</h2>

                            {topCategoriesComputed.slice(0, 3).map((category, index) => {
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
                                            {index + 1}. {category.category}
                                        </h3>
                                        <p style={{ fontSize: '1.25rem', color: '#243b53' }}>
                                            Reports: <strong style={{ color: '#D9534F' }}>{category.count.toLocaleString()}</strong>
                                        </p>
                                    </div>

                                );
                            })}
                            <div className='button-section-nex' style={{ display: 'flex' }}>

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
