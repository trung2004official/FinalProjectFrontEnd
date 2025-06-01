import React from 'react'

const QuizManagement = () => {
  return (
    <div>
      <div className='flex justify-between'>
        <h2 className='font-bold text-6xl'>Quiz Management</h2>
        <div className='manage-control grid grid-cols-3 gap-3'>
            <input type="text" name='title' className='w-full border col-span-2 rounded-lg py-2 px-4 focus:outline-none focus:ring' placeholder='Search quiz'/>
            <button className='w-16 h-16 rounded-full bg-[#0E0E40] text-white font-bold text-5xl justify-self-center'>+</button>
            <select name="major" id="" className='bg-[#0E0E40] text-white font-bold text-3xl rounded-xl '>
                <option value="">Major</option>
            </select>
            <select name="course" id="" className='bg-[#0E0E40] text-white font-bold text-3xl rounded-xl '>
                <option value="">Course</option>
            </select>
            <select name="difficulty" id="" className='bg-[#0E0E40] text-white font-bold text-3xl rounded-xl '>
                <option value="">Difficulty</option>
            </select>
        </div>
      </div>
      <div className='quiz-table-data'>
        <table>
            <thead>
                <tr>
                    <th><input type="checkbox" class="checkbox"/></th>
                    <th>Quiz Title <span style={{color: '#b19cd9'}}>⬇</span></th>
                    <th>Difficulty <span style={{color: 'b19cd9'}}>⬇</span></th>
                    <th>$ <span style={{color: 'b19cd9'}}>⬇</span></th>
                    <th>Company <span style={{color: 'b19cd9'}}>⬇</span></th>
                    <th>Status <span style={{color: 'b19cd9'}}>⬇</span></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="checkbox" class="checkbox" checked/></td>
                    <td><img src="https://via.placeholder.com/20/ffffff/000000?text=W" alt="Watch" class="company-logo"/> Watch</td>
                    <td>Accessories</td>
                    <td>$20</td>
                    <td><img src="https://via.placeholder.com/20/4285f4/000000?text=G" alt="Google" class="company-logo"/> Google</td>
                    <td class="status-in-stock">+ In Stock</td>
                </tr>
                <tr>
                    <td><input type="checkbox" class="checkbox"/></td>
                    <td><img src="https://via.placeholder.com/20/000000/ffffff?text=M" alt="Mobile" class="company-logo"/> Mobile</td>
                    <td>Telecommunication</td>
                    <td>$500</td>
                    <td><img src="https://via.placeholder.com/20/0078d4/000000?text=W" alt="Webflow" class="company-logo"/> Webflow</td>
                    <td class="status-out-of-stock">+ Out of stock</td>
                </tr>
                <tr>
                    <td><input type="checkbox" class="checkbox"/></td>
                    <td><img src="https://via.placeholder.com/20/000000/ffffff?text=L" alt="Laptop" class="company-logo"/> Laptop</td>
                    <td>Note Book</td>
                    <td>$800</td>
                    <td><img src="https://via.placeholder.com/20/3b5998/000000?text=F" alt="Facebook" class="company-logo"/> Facebook</td>
                    <td class="status-out-of-stock">+ Out of stock</td>
                </tr>
                <tr>
                    <td><input type="checkbox" class="checkbox" checked/></td>
                    <td><img src="https://via.placeholder.com/20/000000/ffffff?text=TV" alt="TV" class="company-logo"/> TV</td>
                    <td>Digital</td>
                    <td>$250</td>
                    <td><img src="https://via.placeholder.com/20/00acee/000000?text=T" alt="Twitter" class="company-logo"/> Twitter</td>
                    <td class="status-in-stock">+ In Stock</td>
                </tr>
            </tbody>
        </table>
        <div class="pagination">1-10 of 256</div>
      </div>
    </div>
  )
}

export default QuizManagement
