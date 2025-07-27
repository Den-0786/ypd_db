'use client';

import { useState, useEffect } from 'react';

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCongregation, setSelectedCongregation] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      // For now, using mock data until we fix authentication
      const mockMembers = [
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          phone_number: '+233123456789',
          gender: 'Male',
          congregation: { name: 'Emmanuel Congregation Ahinsan', background_color: '#3B82F6' },
          membership_status: 'Active',
          executive_position: 'president',
          is_executive: true
        },
        {
          id: 2,
          first_name: 'Jane',
          last_name: 'Smith',
          phone_number: '+233987654321',
          gender: 'Female',
          congregation: { name: 'Peniel Congregation Esreso No1', background_color: '#10B981' },
          membership_status: 'Active',
          executive_position: null,
          is_executive: false
        }
      ];
      setMembers(mockMembers);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.phone_number.includes(searchTerm);
    const matchesCongregation = !selectedCongregation || member.congregation.name === selectedCongregation;
    return matchesSearch && matchesCongregation;
  });

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedMembers([]);
      setSelectAll(false);
    } else {
      setSelectedMembers(filteredMembers.map(member => member.id));
      setSelectAll(true);
    }
  };

  const handleSelectMember = (memberId) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId));
      setSelectAll(false);
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
      if (selectedMembers.length + 1 === filteredMembers.length) {
        setSelectAll(true);
      }
    }
  };

  const handleBulkDelete = () => {
    if (selectedMembers.length === 0) {
      alert('Please select members to delete');
      return;
    }
    if (confirm(`Are you sure you want to delete ${selectedMembers.length} member(s)?`)) {
      // Remove selected members from the state
      const updatedMembers = members.filter(member => !selectedMembers.includes(member.id));
      setMembers(updatedMembers);
      setSelectedMembers([]);
      setSelectAll(false);
      
      // TODO: Call Django API to delete from database
      console.log('Deleting members:', selectedMembers);
      alert(`${selectedMembers.length} member(s) deleted successfully!`);
    }
  };

  const handleBulkExport = () => {
    if (selectedMembers.length === 0) {
      alert('Please select members to export');
      return;
    }
    // TODO: Implement bulk export
    console.log('Exporting members:', selectedMembers);
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
              <i className="fas fa-users text-blue-600 mr-3"></i>
              Members
            </h1>
            <p className="text-gray-600 mt-2">Manage YPG members and their information</p>
          </div>
          <a href="/members/add" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
            <i className="fas fa-user-plus mr-2"></i>
            Add Member
          </a>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Members</label>
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Congregation</label>
            <select
              value={selectedCongregation}
              onChange={(e) => setSelectedCongregation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            >
              <option value="" className="text-gray-800">All Congregations</option>
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
          <div className="flex items-end sm:col-span-2 lg:col-span-1">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCongregation('');
              }}
              className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
            >
              <i className="fas fa-times mr-2"></i>
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Member List ({filteredMembers.length} members)
            </h3>
            {selectedMembers.length > 0 && (
              <div className="flex space-x-2">
                <button
                  onClick={handleBulkDelete}
                  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-200 text-sm"
                  title="Delete selected members"
                >
                  <i className="fas fa-trash mr-1"></i>
                  Delete ({selectedMembers.length})
                </button>
                <button
                  onClick={handleBulkExport}
                  className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition duration-200 text-sm"
                  title="Export selected members"
                >
                  <i className="fas fa-download mr-1"></i>
                  Export ({selectedMembers.length})
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
                      title="Select all members"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                    Congregation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    Actions
                  </th>
                </tr>
              </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member.id)}
                      onChange={() => handleSelectMember(member.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {member.first_name[0]}{member.last_name[0]}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {member.first_name} {member.last_name}
                        </div>
                        {member.is_executive && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Executive
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.phone_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.gender === 'Male' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-pink-100 text-pink-800'
                    }`}>
                      <i className={`fas fa-${member.gender === 'Male' ? 'mars' : 'venus'} mr-1`}></i>
                      {member.gender}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: member.congregation.background_color }}
                    >
                      {member.congregation.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.membership_status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {member.membership_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.executive_position ? 
                      member.executive_position.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 
                      'Member'
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <a 
                        href={`/members/${member.id}`} 
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                        title="View member details"
                      >
                        <i className="fas fa-eye"></i>
                      </a>
                      <a 
                        href={`/members/${member.id}/edit`} 
                        className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200"
                        title="Edit member"
                      >
                        <i className="fas fa-edit"></i>
                      </a>
                      <button 
                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                        title="Delete member"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this member?')) {
                            // Remove member from the state
                            const updatedMembers = members.filter(m => m.id !== member.id);
                            setMembers(updatedMembers);
                            
                            // TODO: Call Django API to delete from database
                            console.log('Deleting member:', member.id);
                            alert('Member deleted successfully!');
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
        <h3 className="text-lg font-medium text-gray-900 mb-4">Export Options</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200">
            <i className="fas fa-file-csv mr-2"></i>
            Export CSV
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200">
            <i className="fas fa-file-pdf mr-2"></i>
            Export PDF
          </button>
          <a href="/bulk" className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition duration-200 text-center">
            <i className="fas fa-users mr-2"></i>
            Bulk Add
          </a>
          <a href="/analytics" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200 text-center">
            <i className="fas fa-chart-bar mr-2"></i>
            Analytics
          </a>
        </div>
      </div>
    </div>
  );
} 