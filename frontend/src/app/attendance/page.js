'use client';

import { useState, useEffect } from 'react';

export default function AttendancePage() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogForm, setShowLogForm] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [formData, setFormData] = useState({
    congregation: '',
    date: new Date().toISOString().split('T')[0],
    male_count: 0,
    female_count: 0
  });

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const fetchAttendanceRecords = async () => {
    try {
      // Mock data for now
      const mockRecords = [
        {
          id: 1,
          congregation: { name: 'Emmanuel Congregation Ahinsan' },
          date: '2024-01-14',
          male_count: 25,
          female_count: 30,
          total_count: 55
        },
        {
          id: 2,
          congregation: { name: 'Peniel Congregation Esreso No1' },
          date: '2024-01-14',
          male_count: 18,
          female_count: 22,
          total_count: 40
        }
      ];
      setAttendanceRecords(mockRecords);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Submit to Django API
    console.log('Submitting attendance:', formData);
    setShowLogForm(false);
    setFormData({
      congregation: '',
      date: new Date().toISOString().split('T')[0],
      male_count: 0,
      female_count: 0
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRecords([]);
      setSelectAll(false);
    } else {
      setSelectedRecords(attendanceRecords.map(record => record.id));
      setSelectAll(true);
    }
  };

  const handleSelectRecord = (recordId) => {
    if (selectedRecords.includes(recordId)) {
      setSelectedRecords(selectedRecords.filter(id => id !== recordId));
      setSelectAll(false);
    } else {
      setSelectedRecords([...selectedRecords, recordId]);
      if (selectedRecords.length + 1 === attendanceRecords.length) {
        setSelectAll(true);
      }
    }
  };

  const handleBulkDelete = () => {
    if (selectedRecords.length === 0) {
      alert('Please select records to delete');
      return;
    }
    if (confirm(`Are you sure you want to delete ${selectedRecords.length} attendance record(s)?`)) {
      // Remove selected records from the state
      const updatedRecords = attendanceRecords.filter(record => !selectedRecords.includes(record.id));
      setAttendanceRecords(updatedRecords);
      setSelectedRecords([]);
      setSelectAll(false);
      
      // TODO: Call Django API to delete from database
      console.log('Deleting records:', selectedRecords);
      alert(`${selectedRecords.length} attendance record(s) deleted successfully!`);
    }
  };

  const handleBulkExport = () => {
    if (selectedRecords.length === 0) {
      alert('Please select records to export');
      return;
    }
    // TODO: Implement bulk export
    console.log('Exporting records:', selectedRecords);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              <i className="fas fa-calendar-check text-blue-600 mr-3"></i>
              Attendance Management
            </h1>
            <p className="text-gray-600 mt-2">Track Sunday attendance across congregations</p>
          </div>
          <button
            onClick={() => setShowLogForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            <i className="fas fa-plus mr-2"></i>
            Log Attendance
          </button>
        </div>
      </div>

      {/* Log Attendance Form Modal */}
      {showLogForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Log Sunday Attendance</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Congregation</label>
                  <select
                    value={formData.congregation}
                    onChange={(e) => setFormData({...formData, congregation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    required
                  >
                    <option value="" className="text-gray-800">Select Congregation</option>
                    <option value="Emmanuel Congregation Ahinsan" className="text-gray-800">Emmanuel Congregation Ahinsan</option>
                    <option value="Peniel Congregation Esreso No1" className="text-gray-800">Peniel Congregation Esreso No1</option>
                    <option value="Mizpah Congregation Odagya No1" className="text-gray-800">Mizpah Congregation Odagya No1</option>
                    <option value="Christ Congregation Ahinsan Estate" className="text-gray-800">Christ Congregation Ahinsan Estate</option>
                    <option value="Ebenezer Congregation Dompoase Aprabo" className="text-gray-800">Ebenezer Congregation Dompoase Aprabo</option>
                    <option value="Favour Congregation Esreso No2" className="text-gray-800">Favour Congregation Esreso No2</option>
                    <option value="Liberty Congregation Esreso High Tension" className="text-gray-800">Liberty Congregation Esreso High Tension</option>
                    <option value="Odagya No2" className="text-gray-800">Odagya No2</option>
                    <option value="NOM" className="text-gray-800">NOM</option>
                    <option value="Kokobriko" className="text-gray-800">Kokobriko</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Male Count</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.male_count}
                      onChange={(e) => setFormData({...formData, male_count: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Female Count</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.female_count}
                      onChange={(e) => setFormData({...formData, female_count: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowLogForm(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    Log Attendance
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <i className="fas fa-users text-white"></i>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Attendance
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {attendanceRecords.reduce((sum, record) => sum + record.total_count, 0)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <i className="fas fa-mars text-white"></i>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Male Attendance
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {attendanceRecords.reduce((sum, record) => sum + record.male_count, 0)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-pink-500 rounded-md flex items-center justify-center">
                  <i className="fas fa-venus text-white"></i>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Female Attendance
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {attendanceRecords.reduce((sum, record) => sum + record.female_count, 0)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <i className="fas fa-church text-white"></i>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Congregations
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {new Set(attendanceRecords.map(r => r.congregation.name)).size}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Records Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Attendance Records
            </h3>
            {selectedRecords.length > 0 && (
              <div className="flex space-x-2">
                <button
                  onClick={handleBulkDelete}
                  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-200 text-sm"
                  title="Delete selected records"
                >
                  <i className="fas fa-trash mr-1"></i>
                  Delete ({selectedRecords.length})
                </button>
                <button
                  onClick={handleBulkExport}
                  className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition duration-200 text-sm"
                  title="Export selected records"
                >
                  <i className="fas fa-download mr-1"></i>
                  Export ({selectedRecords.length})
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="overflow-x-auto w-full">
          <table className="w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      title="Select all records"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                    Congregation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">
                    Male
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">
                    Female
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">
                    Actions
                  </th>
                </tr>
              </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRecords.includes(record.id)}
                      onChange={() => handleSelectRecord(record.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.congregation.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.male_count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.female_count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {record.total_count}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                        title="View attendance details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200"
                        title="Edit attendance record"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                        title="Delete attendance record"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this attendance record?')) {
                            // TODO: Implement delete
                            console.log('Deleting record:', record.id);
                          }
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200">
            <i className="fas fa-file-csv mr-2"></i>
            Export CSV
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200">
            <i className="fas fa-file-pdf mr-2"></i>
            Export PDF
          </button>
          <a href="/analytics" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200 text-center">
            <i className="fas fa-chart-bar mr-2"></i>
            View Analytics
          </a>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
            <i className="fas fa-download mr-2"></i>
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
} 