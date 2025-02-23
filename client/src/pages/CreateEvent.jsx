import React, { useState } from 'react';
import { Calendar, Clock, Upload, FormInput, Check, Image as ImageIcon, X } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [meetingRecording, setMeetingRecording] = useState(null);
  const [meetingRecordingName, setMeetingRecordingName] = useState('');
  const [registrationType, setRegistrationType] = useState('form');
  const [formFields, setFormFields] = useState([
    { name: 'Name', type: 'text', required: true },
    { name: 'Email', type: 'email', required: true, locked: true }
  ]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [registrationLink, setRegistrationLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [eventBanner, setEventBanner] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileName, setExcelFileName] = useState('');

  const handleAddField = () => {
    setFormFields([...formFields, { name: '', type: 'text', required: false }]);
  };

  const handleRemoveField = (index) => {
    if (index > 1) {
      const newFields = [...formFields];
      newFields.splice(index, 1);
      setFormFields(newFields);
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventBanner(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validExtensions = ['.xlsx', '.xls'];
      const fileExtension = file.name.substring(file.name.lastIndexOf('.'));
      
      if (!validExtensions.includes(fileExtension)) {
        toast.error('Please upload a valid Excel file (.xlsx or .xls)');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size exceeds 10MB limit');
        return;
      }

      setExcelFile(file);
      setExcelFileName(file.name);
    }
  };

  const handleMeetingRecordingUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validExtensions = ['.mp4', '.mov', '.avi', '.mkv'];
      const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (!validExtensions.includes(fileExtension)) {
        toast.error('Please upload a valid video file (.mp4, .mov, .avi, .mkv)');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size exceeds 10MB limit');
        return;
      }

      setMeetingRecording(file);
      setMeetingRecordingName(file.name);
    }
  };

  const handleRemoveMeetingRecording = () => {
    setMeetingRecording(null);
    setMeetingRecordingName('');
  };

  const handleRemoveExcel = () => {
    setExcelFile(null);
    setExcelFileName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!eventName.trim()) {
      toast.error('Event name is required');
      return;
    }
    if (!description.trim()) {
      toast.error('Description is required');
      return;
    }
    if (!date) {
      toast.error('Date is required');
      return;
    }
    if (!time) {
      toast.error('Time is required');
      return;
    }
    if (!meetingRecording) {
      toast.error('Meeting recording is required');
      return;
    }
    if (registrationType === 'excel' && !excelFile) {
      toast.error('Please upload an Excel file with attendees');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('eventName', eventName);
      formData.append('description', description);
      formData.append('date', date);
      formData.append('time', time);
      formData.append('meetingRecording', meetingRecording);
      formData.append('registrationType', registrationType);
      
      if (registrationType === 'form') {
        formData.append('formFields', JSON.stringify(formFields));
      }
      if (eventBanner) {
        formData.append('banner', eventBanner);
      }
      if (registrationType === 'excel' && excelFile) {
        formData.append('excelFile', excelFile);
      }

      const eventResponse = await fetch('http://localhost:4000/api/events/create', {
        method: 'POST',
        body: formData,
      });

      const eventData = await eventResponse.json();

      if (!eventResponse.ok) {
        throw new Error(eventData.message || 'Failed to create event');
      }

      toast.success('Event created successfully!', {
        duration: 4000,
        position: 'top-right',
      });

      if (registrationType === 'form') {
        setRegistrationLink(eventData.registrationLink);
        setShowSuccess(true);
      }

      // Send emails if Excel registration type
      if (registrationType === 'excel' && excelFile) {
        const emailFormData = new FormData();
        emailFormData.append('file', excelFile);
        emailFormData.append('eventName', eventName);
        emailFormData.append('date', date);
        emailFormData.append('summary', eventData.transcription?.summary || 'No summary available'); // Assuming summary comes from transcription

        const emailResponse = await fetch('http://localhost:4000/api/email/upload', {
          method: 'POST',
          body: emailFormData,
        });

        const emailData = await emailResponse.json();
        if (!emailResponse.ok) {
          throw new Error(emailData.message || 'Failed to send emails');
        }

        toast.success('Emails sent to participants successfully!', {
          duration: 4000,
          position: 'top-right',
        });
      }

      // Reset form
      setEventName('');
      setDescription('');
      setDate('');
      setTime('');
      setMeetingRecording(null);
      setMeetingRecordingName('');
      setEventBanner(null);
      setPreviewUrl('');
      setExcelFile(null);
      setExcelFileName('');
      setFormFields([
        { name: 'Name', type: 'text', required: true },
        { name: 'Email', type: 'email', required: true, locked: true }
      ]);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 my-8">
      <h2 className="text-2xl font-bold mb-8">Create New Event</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Event Banner</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            {previewUrl ? (
              <div className="space-y-2">
                <img src={previewUrl} alt="Event banner preview" className="max-h-48 rounded-lg" />
                <button
                  type="button"
                  onClick={() => {
                    setEventBanner(null);
                    setPreviewUrl('');
                  }}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove banner
                </button>
              </div>
            ) : (
              <div className="space-y-1 text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="banner"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                  >
                    <span>Upload a banner</span>
                    <input
                      id="banner"
                      name="banner"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleBannerChange}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Event Name *</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter event name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter event description"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date *</label>
            <div className="mt-1 relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 pl-10 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Time *</label>
            <div className="mt-1 relative">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2 pl-10 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <Clock className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Meeting Recording *</label>
          <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {meetingRecording ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <Upload className="h-6 w-6" />
                  <span className="text-sm">{meetingRecordingName}</span>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveMeetingRecording}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <>
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label
                    htmlFor="meetingRecording"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    <span>Upload Meeting Recording</span>
                    <input
                      id="meetingRecording"
                      name="meetingRecording"
                      type="file"
                      className="sr-only"
                      accept="video/*"
                      onChange={handleMeetingRecordingUpload}
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  MP4, MOV, AVI, MKV up to 10MB
                </p>
              </>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Registration Type *</label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setRegistrationType('excel')}
              className={`flex items-center px-4 py-2 rounded-md ${
                registrationType === 'excel'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Upload className="h-5 w-5 mr-2" />
              Excel Upload
            </button>
            <button
              type="button"
              onClick={() => setRegistrationType('form')}
              className={`flex items-center px-4 py-2 rounded-md ${
                registrationType === 'form'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <FormInput className="h-5 w-5 mr-2" />
              Registration Form
            </button>
          </div>
        </div>

        {registrationType === 'form' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Form Fields</h3>
              <button
                type="button"
                onClick={handleAddField}
                className="text-indigo-600 hover:text-indigo-700"
              >
                + Add Field
              </button>
            </div>
            {formFields.map((field, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={field.name}
                  onChange={(e) => {
                    const newFields = [...formFields];
                    newFields[index].name = e.target.value;
                    setFormFields(newFields);
                  }}
                  className="flex-1 px-4 py-2 border rounded-md"
                  placeholder="Field name"
                  disabled={field.locked}
                />
                <div className="flex flex-wrap gap-2">
                  <select
                    value={field.type}
                    onChange={(e) => {
                      const newFields = [...formFields];
                      newFields[index].type = e.target.value;
                      setFormFields(newFields);
                    }}
                    className="px-4 py-2 border rounded-md"
                    disabled={field.locked}
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="number">Number</option>
                    <option value="tel">Phone</option>
                    <option value="radio">Radio</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="select">Dropdown</option>
                    <option value="textarea">Text Area</option>
                  </select>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) => {
                        const newFields = [...formFields];
                        newFields[index].required = e.target.checked;
                        setFormFields(newFields);
                      }}
                      className="mr-2"
                      disabled={field.locked}
                    />
                    Required
                  </label>
                  {!field.locked && (
                    <button
                      type="button"
                      onClick={() => handleRemoveField(index)}
                      className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {registrationType === 'excel' && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {excelFile ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <Upload className="h-6 w-6" />
                  <span className="text-sm">{excelFileName}</span>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveExcel}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <>
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label
                    htmlFor="excelFile"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    <span>Upload Excel File</span>
                    <input
                      id="excelFile"
                      name="excelFile"
                      type="file"
                      className="sr-only"
                      accept=".xlsx,.xls"
                      onChange={handleExcelUpload}
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Drag and drop your Excel file here (.xlsx, .xls) up to 10MB
                </p>
              </>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 relative"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating Event...
            </div>
          ) : (
            'Create Event'
          )}
        </button>
      </form>

      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-100 p-2 rounded-full">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Event Created Successfully!</h3>
            <p className="text-gray-600 text-center mb-4">
              Your event has been created. Here's your registration form link:
            </p>
            <div className="bg-gray-50 p-3 rounded-md mb-4">
              <p className="text-sm font-mono break-all">{registrationLink}</p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEvent;